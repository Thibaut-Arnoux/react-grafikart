import { useEffect, useState } from 'react';
import { Input } from './components/forms/Input';
import { Checkbox } from './components/forms/Checkbox';

function App() {
    const [showInput, setShowInput] = useState(false);
    const [duration, setDuration] = useState(5);
    const [secondLeft, setSecondLeft] = useState(duration);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondLeft((s) => {
                if (s <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return s - 1;
            });
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, [duration]);

    const handleChange = (v) => {
        setDuration(v);
        setSecondLeft(v);
    };

    return (
        <div className="vstack gap-2">
            <Checkbox
                id="title"
                label="Afficher le champ titre"
                checked={showInput}
                onChange={setShowInput}
            />
            {showInput && <EditTitle />}
            <Input placeholder="Timer..." value={duration} onChange={handleChange} />
            <p>Décompte : {secondLeft}</p>
        </div>
    );
}

function EditTitle() {
    const [title, setTitle] = useState('');

    useEffect(() => {
        const originalTitle = document.title;

        return () => {
            document.title = originalTitle;
        };
    }, []);

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <>
            <Input placeholder="Modifier le titre" value={title} onChange={setTitle} />
        </>
    );
}

export default App;

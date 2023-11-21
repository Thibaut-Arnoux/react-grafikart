import { memo, useCallback, useRef, useState } from 'react';
import { Input } from './components/forms/Input';

function App() {
    console.log('App', 'render');

    const [name, setName] = useState('');
    const nameRef = useRef(name);
    nameRef.current = name;

    const handleClick = useCallback(() => {
        console.log(nameRef.current);
    }, []);

    return (
        <div>
            <div>
                <Input label="Prénom" onChange={setName} value={name} />
                <div>{name.toUpperCase()}</div>
            </div>
            <InfoMemo onClick={handleClick} />
        </div>
    );
}

const InfoMemo = memo(function Info({ onClick }) {
    console.log('Info', 'render');

    return (
        <div className="alert alert-info" onClick={onClick}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias delectus numquam
            voluptas velit veritatis
        </div>
    );
});

export default App;

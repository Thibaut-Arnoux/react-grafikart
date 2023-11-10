// import { useRef } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Input } from './components/forms/Input';

function App() {
    const prefixRef = useRef(null);
    const [prefix, setPrefix] = useState('');
    prefixRef.current = prefix;

    const inputRef = useRef(null);
    console.log(inputRef);

    useEffect(() => {
        const timer = setInterval(() => {
            console.log(prefixRef.current);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <Input ref={inputRef} placeholder="prefix" value={prefix} onChange={setPrefix} />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint consequatur at beatae qui
            accusamus, rem ullam porro voluptas consequuntur fugit harum cumque voluptate numquam
            dolorem quisquam aut libero dicta nobis!
        </div>
    );
}

export default App;

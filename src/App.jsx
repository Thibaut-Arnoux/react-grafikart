import { useState } from 'react';

function App() {
    const [count, setCount] = useState(0);
    const [person, setPerson] = useState({
        firstname: 'John',
        lastname: 'Doe',
        age: 18
    });

    const handleIncrementCount = () => {
        setCount((count) => count + 1);
        setCount((count) => count + 1);
    };

    const handleIncrementAge = () => {
        setPerson({ ...person, age: person.age + 1 });
    };

    return (
        <>
            <p>Compteur: {count}</p>
            <button onClick={handleIncrementCount}>Incrémenter de 2 en 2</button>
            <hr />
            <p>
                Age de {person.firstname} : {person.age}
            </p>
            <button onClick={handleIncrementAge}>
                Veillir {person.firstname} {person.lastname}
            </button>
        </>
    );
}

export default App;

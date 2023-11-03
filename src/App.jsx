import { useState } from 'react';

function App() {
    // controlled input
    // const [firstname, setFirstname] = useState('John');

    // uncontrolled input
    const firstname = 'John';

    // controlled input
    // const handleChange = (event) => {
    //     setFirstname(event.target.value);
    // };

    // uncontrolled input
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData.get('firstname'));
    };

    console.log('rendered');

    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* controlled input */}
                {/* <input type="text" name="firstname" value={firstname} onChange={handleChange} /> */}

                {/* uncontrolled input */}
                <input type="text" name="firstname" defaultValue={firstname} />
                <button>Envoyer</button>
            </form>
        </>
    );
}

export default App;

import { useState, useMemo } from 'react';
import { Input } from './components/forms/Input';

function App() {
    const [firstname, setFirstname] = useState('John');
    const [password, setPassword] = useState('MotdePasse');
    const random = useMemo(() => {
        return Math.random();
    }, []);
    const security = useMemo(() => {
        return passwordSecurity(password);
    }, [password]);

    return (
        <div className="container my-v3 vstack gap-2">
            Random : {random}
            <Input label="Nom d'utilisateur" value={firstname} onChange={setFirstname} />
            <Input label="Password" value={password} onChange={setPassword} />
            Sécurité: {security}
        </div>
    );
}

function passwordSecurity(password) {
    // Fake latency
    let startTime = performance.now();
    while (performance.now() - startTime < 200) {}

    if (password.length < 3) {
        return 'Faible';
    } else if (password.length < 6) {
        return 'Moyen';
    }

    return 'Fort';
}

export default App;

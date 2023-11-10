import { useState } from 'react';
import { Input } from './components/forms/Input';
import { useIncrement } from './hooks/useIncrement';
import { useToggle } from './hooks/useToggle';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import { useFetch } from './hooks/useFetch';

function App() {
    const [checked, setChecked] = useToggle();
    const { count, increment, decrement } = useIncrement({
        base: 0,
        min: -10,
        max: 10
    });
    const [title, setTitle] = useState('');
    useDocumentTitle(title ? `Editer ${title}` : null);

    const { data, loading, errors } = useFetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=10&_delay=5000'
    );

    return (
        <div>
            <input type="checkbox" checked={checked} onChange={setChecked} />
            <hr />
            <button onClick={increment}>+</button>
            <span>{count}</span>
            <button onClick={decrement}>-</button>
            {checked && (
                <>
                    <hr />
                    <Input value={title} onChange={setTitle} label="Title" />
                </>
            )}
            <hr />
            <div className="container my-2">
                {loading && (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
                {errors && <div className="alert alert-danger">{errors.toString()}</div>}
                {data && (
                    <div>
                        <ul>
                            {data.map((post) => (
                                <li key={post.id}>{post.title}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;

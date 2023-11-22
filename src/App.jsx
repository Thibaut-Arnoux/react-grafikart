import { useRef } from 'react';
import { Input } from './components/forms/Input';
import { useTodos } from './hooks/useTodos';

function App() {
    const inputTodo = useRef(null);
    const { todos, addTodo, toggleTodo, removeTodo, removeCompletedTodo } = useTodos();

    return (
        <>
            <Input ref={inputTodo} placeholder="Ajouter une tâche" />
            <button
                onClick={() => {
                    addTodo({
                        name: inputTodo.current.value,
                        checked: false
                    });
                    inputTodo.current.value = null;
                }}
            >
                Ajouter
            </button>
            <hr />
            <ul>
                {todos.map((todo) => (
                    <li key={todo.name}>
                        <input
                            type="checkbox"
                            checked={todo.checked}
                            onChange={() => toggleTodo(todo)}
                        />
                        {todo.name}
                        <button onClick={() => removeTodo(todo)}>Supprimer</button>
                    </li>
                ))}
            </ul>
            <button onClick={removeCompletedTodo}>Supprimer les tâches accomplies</button>
        </>
    );
}

export default App;

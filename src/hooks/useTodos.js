import { useCallback, useReducer } from 'react';

function todoReducer(state, action) {
    console.log(state, action);

    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case 'REMOVE_TODO':
            return {
                ...state,
                todos: state.todos.filter((todo) => todo !== action.payload)
            };
        case 'REMOVE_COMPLETED_TODO':
            return {
                ...state,
                todos: state.todos.filter((todo) => !todo.checked)
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo === action.payload ? { ...todo, checked: !todo.checked } : todo
                )
            };
    }

    return state;
}

export const useTodos = () => {
    const [state, dispatch] = useReducer(todoReducer, {
        todos: []
    });

    return {
        todos: state.todos,
        addTodo: useCallback((todo) => dispatch({ type: 'ADD_TODO', payload: todo }), []),
        toggleTodo: useCallback((todo) => dispatch({ type: 'TOGGLE_TODO', payload: todo }), []),
        removeTodo: useCallback((todo) => dispatch({ type: 'REMOVE_TODO', payload: todo }), []),
        removeCompletedTodo: useCallback(() => dispatch({ type: 'REMOVE_COMPLETED_TODO' }), [])
    };
};

function App() {
    const myList = ['Item 1', 'Item 2', 'Item 3'];

    return (
        <>
            <Title id="myId" className="myClass" color="blue">
                Mon premier composant
            </Title>
            <ul>
                {myList.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </>
    );
}

function Title({ color, hidden, children, ...props }) {
    if (hidden) {
        return null;
    }

    return (
        <h1 style={{ color: color }} {...props}>
            {children}
        </h1>
    );
}

export default App;

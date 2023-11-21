import { createPortal } from 'react-dom';

function App() {
    return (
        <div
            style={{
                height: 300,
                overflowY: 'scroll',
                background: '#EEE',
                margin: 20,
                position: 'relative'
            }}
        >
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe obcaecati temporibus
                laboriosam officiis excepturi vero maiores sequi, repudiandae beatae atque laborum.
                Corporis, magnam perspiciatis nobis nesciunt esse totam accusantium ullam!
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eius laboriosam, autem
                beatae amet nihil laborum vitae aut unde officiis tempora, quos sed obcaecati iusto
                quaerat cumque, impedit enim quasi.
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, placeat dolor quis
                ex esse vero blanditiis quibusdam? Accusamus nam minima debitis vel perspiciatis
                dolor sed expedita, sequi consequuntur cumque ea?
            </p>
            <Modal />
        </div>
    );
}

function Modal() {
    return createPortal(
        <div
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: 10,
                border: 'solid 1px grey',
                backgroud: '#FFF'
            }}
        >
            Je suis une modal
        </div>,
        document.body
    );
}

export default App;

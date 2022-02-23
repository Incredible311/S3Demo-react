import { ReactElement, useEffect, useCallback, useState } from "react"
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

function Chat(): ReactElement {

    const ws = new WebSocket(process.env.REACT_APP_WEB_SOCKET || 'ws://localhost:3030');
    const [send, setSend] = useState(false)

    const handleNewUserMessage = useCallback(async (newMessage: string) => {

        await ws.send(JSON.stringify({
            content: newMessage
        }));
        setSend(!send)
        ws.onmessage = evt => {
            const message = JSON.parse(evt.data);
            console.log(evt.data, message);
            addResponseMessage(message.response)
        }

    }, [send])

    useEffect(() => {
        ws.onopen = () => {
            console.log('connected');
        }

        // ws.onclose = () => {
        //     console.log('disconnected');
        // }

        // setTimeout(() => {
        //     const message = { content:  'Test message!'}
        //     ws.send(JSON.stringify(message));
        // }, 3000);
    }, [ws])

    return (
        <div>
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                title="Chat with bot"
                subtitle=""
            />
        </div>
    )
}

export default Chat
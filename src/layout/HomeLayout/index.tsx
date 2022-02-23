import React from "react"
import Header from "./Header"
import Chat from "../../components/Chat"

const HomeLayout: React.FC = ({ children }) => {
    return (
        <div className="default-layout">
            <Header />
            <div>{children}</div>
            <Chat />
        </div>
    )
}

export default HomeLayout

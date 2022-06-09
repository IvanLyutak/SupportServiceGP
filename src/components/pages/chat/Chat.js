import React from 'react'

import Home from './Home';

import './Chat.css'

class Chat extends React.Component{

    render(){
        return (
            <>
            {(JSON.parse(sessionStorage.getItem('user')) === null) ? (
                <div className="welcome-user"> Авторизуйтесь! </div>
                ) : (
                    <Home />
                )}
            </>
        );
   }
}

export default Chat
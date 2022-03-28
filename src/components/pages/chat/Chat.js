import React from 'react'


class Chat extends React.Component{
   render(){
    return (
        <>
         {(JSON.parse(sessionStorage.getItem('user')) === null) ? (
            <div className="welcome-user"> Авторизуйтесь! </div>
            ) : (
                <div>
                    Чат
                </div>
            )}
        </>
    );
   }
}

export default Chat
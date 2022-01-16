import React from 'react'


class Chat extends React.Component{
   render(){
    return (
        <>
         {(JSON.parse(localStorage.getItem('user')) === false) ? (
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
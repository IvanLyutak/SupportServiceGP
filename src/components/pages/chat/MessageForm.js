import React from "react";

import './Chat.css'

const MessageForm = ({ handleSubmit, text, setText, setImg }) => {
  return (
    <form className="message_form">

     <div className="inline_class">
        <input type="text" className='dns' placeholder="Напишите сообщение..." value={text} onChange={(e) => setText(e.target.value)} id='email_textfield'/>
        <input type="button" value="Отправить" className='button_send' onClick={handleSubmit}/>
    </div>


    </form>
  );
};

export default MessageForm;
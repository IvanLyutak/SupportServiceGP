import React, { useState, useEffect } from 'react'

import User from './User'
import MessageForm from './MessageForm';
import Message from './Message';

import './Chat.css'

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, push, get, onChildAdded, limitToLast, query } from "firebase/database";
import firebaseConfig from "../../../FirebaseConfig";

const Home = () => {

    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState("");
    const [text, setText] = useState("");
    const [msgs, setMsgs] = useState([]);

    const user1 = JSON.parse(sessionStorage.getItem('user'))

    const db = getDatabase(initializeApp(firebaseConfig));

    const postRef = ref(db, 'messages/');

    useEffect(() => {
        let currentUser = JSON.parse(sessionStorage.getItem('user')).uid
        onValue(ref(db, `user-messages/${currentUser}/`), (snapshot) => {
            if (snapshot.val() == undefined){
                return
            }
            var users_data = []
            Object.keys(snapshot.val()).forEach((item) => {
                const ref_last_message = query(ref(db, `user-messages/${user1.uid}/${item}`), limitToLast(1));
                get(ref_last_message).then((snapshot_last_message) => {
                    if (snapshot_last_message.val() == undefined){
                        return
                    }
                    let message = Object.keys(snapshot_last_message.val())[0];
                    get(ref(db, `messages/${message}/`)).then((snapshot_message) => { 
                        if (snapshot_message.val() == null){
                            return
                        }
                        let dictionary = snapshot_message.val()
                        
                        // Последнее сообщение
                        users_data.push({
                            uid: item,
                            email: dictionary.email,
                            timestamp: dictionary.timestamp,
                            text: dictionary.text
                        })
                        users_data.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1);
                        if (users_data.length === Object.keys(snapshot.val()).length) {
                            setUsers(users_data);
                        }
                    })
            })
            })
        })
    }, []) 

    const selectUser = async (user) => {
        setText("")
        setChat(user)
        const UserMessagesListRef = ref(db, `user-messages/${user1.uid}/${user.uid}`);
        onValue(UserMessagesListRef, (data) => {
            if (data.val() == undefined){
                return
            }
            var messages = []
            Object.keys(data.val()).forEach((item) => {
                const UserMessageRef = ref(db, `messages/${item}`);
                get(UserMessageRef).then((inner_snapshot) => { 
                    if (inner_snapshot.val() == undefined){
                        return
                    }
                    messages.push(Object(inner_snapshot.val()))
                    messages.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
                    if (messages.length === Object.keys(data.val()).length) {
                        setMsgs(messages);
                    }
                });
        });
        });
    }

    


    const handleSubmit = async e => {
        e.preventDefault()

        if (text.length > 0) {

            const user2 = chat

            const timestamp = Math.round(Date.now() / 1000);


            const postId = push(postRef).key;

            set(ref(db, 'messages/' + postId), {
              email: user2.email,
              fromId: user1.uid,
              text: text,
              timestamp: timestamp,
              toId: user2.uid
            });




            set(ref(db, `user-messages/${user1.uid}/${user2.uid}/${postId}`), 1)

            set(ref(db, `user-messages/${user2.uid}/${user1.uid}/${postId}`), 1)


        }

        setText("")

    }
    return (
                    <div className='home_container'>
                        <div className='users_container'>
                            {users.map((user) => {return <User key={user.uid} user={user} selectUser={selectUser}/>})}
                        </div>
                        <div className='messages_container'>
                            {chat ? (
                                <>
                                    <div className='messages_user'>
                                        <h4>{chat.email}</h4>
                                    </div>
                                    <div className="messages">
                                    {msgs.length
                                        ? msgs.map((msg, i) => (
                                            <Message key={i} msg={msg} user1={user1.uid} />
                                        ))
                                        : null}
                                    </div>
                                    <MessageForm
                                        handleSubmit={handleSubmit}
                                        text={text}
                                        setText={setText}
                                    />
                                </>
                            ) : (
                                <h3 className='no_conv'>Select a user to start conversation</h3>
                            )}
                        </div>
                    </div>
        );
}

export default Home
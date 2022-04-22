import React, { useState, useEffect } from 'react'

import User from './User'
import MessageForm from './MessageForm';
import Message from './Message';

import './Chat.css'

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, push} from "firebase/database";
import firebaseConfig from "../../../FirebaseConfig";
const Home = () => {

    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState("");
    const [text, setText] = useState("");
    const [msgs, setMsgs] = useState([]);
    const user1 = JSON.parse(sessionStorage.getItem('user'))

    const db = getDatabase(initializeApp(firebaseConfig));

    const starCountRef = ref(db, 'user-messages/');

    const postRef = ref(db, 'messages/');



    useEffect(() => {

        onValue(starCountRef, (snapshot) => {
            if (snapshot.val() == null){
                return
            }
            let currentUser = JSON.parse(sessionStorage.getItem('user')).uid
            var users_data = []
            for(let i = 0; i < Object.keys(snapshot.val()).length; i++) {
                const ref_user = ref(db, `users/${Object.keys(snapshot.val())[i]}`);
                onValue(ref_user, (snapshot_user) => {
                    if (snapshot.val() == null){
                        return
                    }
                    let dictionary = snapshot_user.val()
                    if(Object.keys(snapshot.val())[i] !== currentUser){
                        users_data.push({
                            uid: Object.keys(snapshot.val())[i],
                            email: dictionary.email
                        })
                    }
                    if (i+1 === Object.keys(snapshot.val()).length) {
                        setUsers(users_data)
                    }
                })
            }
        })
    }, [])

    const selectUser = (user) => {
        setChat(user)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const user2 = chat

        const timestamp = Math.round(Date.now() / 1000);


        console.log(user1.email)
        console.log(user1.uid)
        console.log(user2.uid)
        console.log(text)


        const postId = push(postRef).key;

        set(ref(db, 'messages/' + postId), {
          email: user1.email,
          fromId: user1.uid,
          text: text,
          timestamp: timestamp,
          toId: user2.uid
        });


        set(ref(db, `user-messages/${user1.uid}/${user2.uid}/${postId}`), 1)

        set(ref(db, `user-messages/${user2.uid}/${user1.uid}/${postId}`), 1)


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
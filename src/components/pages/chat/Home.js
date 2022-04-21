import React, { useState, useEffect } from 'react'

import User from './User'
import MessageForm from './MessageForm';
import Message from './Message';

import './Chat.css'

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue} from "firebase/database";
import firebaseConfig from "../../../FirebaseConfig";
const Home = () => {

    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState("");
    const [text, setText] = useState("");
    const [msgs, setMsgs] = useState([]);
    const user1 = JSON.parse(sessionStorage.getItem('user')).uid

    useEffect(() => {
        const db = getDatabase(initializeApp(firebaseConfig));
        const starCountRef = ref(db, 'user-messages/');

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

        const user2 = chat.uid
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
        
        console.log(id)
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
                                            <Message key={i} msg={msg} user1={user1} />
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
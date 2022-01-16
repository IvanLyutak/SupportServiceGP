import React from 'react'
import { Form, FormLabel, Button } from 'react-bootstrap';
import './Authorization.css'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue} from "firebase/database";
import firebaseConfig from "../../FirebaseConfig";

class Authorization extends React.Component{
    constructor(){
        super();
        if (localStorage.getItem('user') === null) {
            localStorage.setItem('user', false);
        }
        this.entry = this.entry.bind(this);
     }
    entry = (e) => {
        e.preventDefault()
        let email = document.getElementById("formBasicEmail").value;
        let password = document.getElementById("formBasicPassword").value;
        initializeApp(firebaseConfig);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const db = getDatabase(initializeApp(firebaseConfig));
            const starCountRef = ref(db, 'admins/');
            onValue(starCountRef, (snapshot) => {
                if(snapshot.val() == null){
                   return;
                }
                else if(snapshot.val().includes(email)){
                    const user = userCredential.user;
                    console.log(user)
                    localStorage.setItem('user', true);
                    var elem = document.getElementsByClassName('error-field'); 
                    elem[0].innerHTML = ""
                    window.location.reload();
                }
                else {
                    console.log("error admins")
                    elem = document.getElementsByClassName('error-field'); 
                    elem[0].innerHTML = "Неправильная почта или пароль"
                }
            }) 
        })
        .catch((error) => {
            console.log("error")
            var elem = document.getElementsByClassName('error-field'); 
            elem[0].innerHTML = "Неправильная почта или пароль"
        });

    }
   render(){
    return (
        <>
        {(JSON.parse(localStorage.getItem('user')) === true) ? (
            <div className="welcome-user"> Welcome User</div>
            ) : (
            <Form className="login-form">
                <FormLabel className="auth_label"> Авторизация </FormLabel>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
                <Button variant='size' type="submit" className="btn-login" onClick={this.entry}>
                    Войти
                </Button>
                <div className='error-field'></div>
            </Form>
            )}
            </>
    );
   }
}

export default Authorization
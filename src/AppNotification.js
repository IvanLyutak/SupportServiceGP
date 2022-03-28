import React, { useEffect } from 'react'
import './App.css';
import { useNotification } from "./components/notifications/NotificationProvider"
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off} from "firebase/database";
import firebaseConfig from "./FirebaseConfig";


function request(dispatch){

    //Прослушивание изменений
    console.log(sessionStorage.getItem('test'))
      const db = getDatabase(initializeApp(firebaseConfig));
      const starCountRef = ref(db, 'operation_center/notification');
      var check = 0
      off(starCountRef)
      onValue(starCountRef, (snapshot) => {
        if(snapshot.val() == null){
          return;
        }
        console.log('observer')
        console.log(snapshot.val())
        const massiv = snapshot.val()
        const lastItem = massiv[Object.keys(massiv)[Object.keys(massiv).length - 1]]
        console.log(lastItem)
        if(check === 1){
          if (JSON.parse(sessionStorage.getItem('user')) !== null){
            dispatch({
                type: "ERROR",
                message: lastItem["message"],
                title: lastItem["address"]
            })
          }
        }
        check = 1
      })
}
function AppNotification() {
  
    const dispatch = useNotification();

    useEffect(() => {
        request(dispatch)
    });

  return (
    <div className="AppExt"></div>
  );
}

export default AppNotification;

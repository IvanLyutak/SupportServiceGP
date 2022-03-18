import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


function Notify(title, message, type, duration) {
        Store.addNotification({
          title: title,
          message: message,
          type: type,
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: duration,
            onScreen: true
          }
        });
}




export default Notify
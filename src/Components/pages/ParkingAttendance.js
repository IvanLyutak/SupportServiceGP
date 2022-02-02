import React from 'react'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue} from "firebase/database";
import TableParkingAttendance from "./TableParkingAttendance"
import './ParkingAttendance.css'
import { Form } from 'react-bootstrap';
import firebaseConfig from "../../FirebaseConfig";

class ParkingAttendance extends React.Component{
    constructor() {
        super();
        this.state = { data_table: {}}
        console.log(localStorage.getItem('user'))
      }
    componentDidMount() {
        const db = getDatabase(initializeApp(firebaseConfig));
        const starCountRef = ref(db, 'save_data/');

        onValue(starCountRef, (snapshot) => {
            const data = Object.keys(snapshot.val()).map(k=>(snapshot.val()[k]))


            for (const elem of data) {
            
              elem["time_reservation"] = (elem["time_reservation"]).split('.')[0]
              elem["time_arrive"] = (elem["time_arrive"]).split('.')[0]
              elem["time_exit"] = (elem["time_exit"]).split('.')[0]

              var pad = function(i) { return (i < 10) ? '0' + i : i; };

              var local_time_reservation = new Date(elem["time_reservation"] + ' UTC');
              var local_time_arrive = new Date(elem["time_arrive"] + ' UTC');
              var local_time_exit = new Date(elem["time_exit"] + ' UTC');

              elem["time_reservation"] = local_time_reservation.getFullYear() + '-' +
                pad(local_time_reservation.getMonth() + 1) + '-' + pad(local_time_reservation.getDate()) + ' '
                + pad(local_time_reservation.getHours()) + ':' + pad(local_time_reservation.getMinutes()) + ':' +
                pad(local_time_reservation.getSeconds());

              elem["time_arrive"] = local_time_arrive.getFullYear() + '-' +
                pad(local_time_arrive.getMonth() + 1) + '-' + pad(local_time_arrive.getDate()) + ' '
                + pad(local_time_arrive.getHours()) + ':' + pad(local_time_arrive.getMinutes()) + ':' +
                pad(local_time_arrive.getSeconds());

              elem["time_exit"] = local_time_exit.getFullYear() + '-' +
                pad(local_time_exit.getMonth() + 1) + '-' + pad(local_time_exit.getDate()) + ' '
                + pad(local_time_exit.getHours()) + ':' + pad(local_time_exit.getMinutes()) + ':' +
                pad(local_time_exit.getSeconds());

            }
            this.setState({
                data_table: {
                  columns: [
                    {
                      label: 'Пользователь',
                      field: 'author',
                      sort: 'asc'
                    },
                    {
                      label: 'Почта пользователя',
                      field: 'email',
                      sort: 'asc'
                    },
                    {
                      label: 'Адрес паркинга',
                      field: 'reservation_adress',
                      sort: 'asc'
                    },
                    {
                      label: 'Время бронирования',
                      field: 'time_reservation',
                      sort: 'asc'
                    }
                    ,
                    {
                      label: 'Время вьезда',
                      field: 'time_arrive',
                      sort: 'asc'
                    },
                    {
                      label: 'Время выезда',
                      field: 'time_exit',
                      sort: 'asc'
                    }
                  ],
                  rows: data.reverse()
                }
             })    
        });
    }
   render(){
    return (
        <>
        {(JSON.parse(localStorage.getItem('user')) === false) ? (
            <div className="welcome-user"> Авторизуйтесь! </div>
            ) : (
          <div className="parking-attendance-page">
            <Form className="parking-attendance">
                <TableParkingAttendance data_table={this.state.data_table}/>
            </Form>
          </div>
            )}
        </>
    );
   }
}
export default ParkingAttendance
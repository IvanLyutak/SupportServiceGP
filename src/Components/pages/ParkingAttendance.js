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
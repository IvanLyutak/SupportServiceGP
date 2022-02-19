import React from 'react'
import { Form, Button } from 'react-bootstrap'
import "./Transactions.css"
import TableParkingAttendance from './TableParkingAttendance';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue} from "firebase/database";
import firebaseConfig from "../../FirebaseConfig";

class Transactions extends React.Component{
   constructor(){
      super();
      this.state = { data_table: {}}
      this.find = this.find.bind(this);

       this.pad = function(i) { return (i < 10) ? '0' + i : i; };
       this.current_date = new Date();
       this.current_year_month = this.current_date.getFullYear() + '-' +
                this.pad(this.current_date.getMonth() + 1)
   }
   find() {
      console.log("Click")
      var dateEntered = new Date(document.getElementById("input_date").value);
      var date = dateEntered.getFullYear()+"-"+(dateEntered.getMonth()+1)
      var address = document.getElementById("name_address").value;
      const db = getDatabase(initializeApp(firebaseConfig));
      const starCountRef = ref(db, 'parking_balances/'+address+"/"+date+"/");

      onValue(starCountRef, (snapshot) => {
         if(snapshot.val() == null){
            var elem = document.getElementsByClassName('address'); 
            elem[0].innerHTML = "Нет данных"
            this.setState({ data_table: {}})
            elem = document.getElementsByClassName('price'); 
            elem[0].innerHTML = ""
            console.log("Error");
            return;
         }

         elem = document.getElementsByClassName('address'); 
         elem[0].innerHTML = address

         elem = document.getElementsByClassName('price'); 
         elem[0].innerHTML = snapshot.val()["balance"] + " руб."

         var load_data = [];
         for (const [key, value] of Object.entries(snapshot.val()["report"])) {
            load_data.push(value)
         }
         this.setState({
            data_table: {
              columns: [
                {
                  label: 'Госномер авто',
                  field: 'number_auto',
                  sort: 'asc'
                },
                {
                  label: 'Сумма, руб',
                  field: 'price',
                  sort: 'asc'
                },
                {
                  label: 'Время платного бронирования',
                  field: 'time_retention',
                  sort: 'asc'

                },
                {
                  label: 'Время нахождения на паркинге',
                  field: 'time_location',
                  sort: 'asc'
                }
              ],
              rows: load_data.reverse()
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
            <>
            <Form className="col-1-4">
               <div className="col-1-4-1">
                  <div className="name_parking"> Адрес паркинга </div>
                  <Form.Select aria-label="Floating label select example" className="form-select" id="name_address">
                     <option value="Большой Саввинский переулок, 11">Большой Саввинский переулок, 11</option>
                     <option value="Москва, Покровский бульвар, 11">Москва, Покровский бульвар, 11</option>
                  </Form.Select>
                  <div className="date"> Дата </div>
                  <div className="date-input"><input type="month" className="date-input-month" id="input_date" defaultValue={this.current_year_month}/></div>
                  <Button variant='size' type="button" className="btn-find" onClick={this.find}>
                     Найти
                  </Button>
               </div>
               <div className="col-1-4-2">
                  <div className="balance"> Баланс паркинга: </div>
                  <div className="address"> Выберите адрес и дату</div>
                  <div className="price"></div>
               </div>
            </Form>
            <Form className="col-3-4">
                <div className="col-3-4-1">
                  <div className = "report"> Отчет по проведенным транзакциям</div>
                  <div className="col-3-4-1-1">
                     <TableParkingAttendance data_table={this.state.data_table}/>
                  </div>
               </div>
            </Form>
            </>
            )};  
        </>
      );
   }
}
export default Transactions
import React from 'react'
import './Users.css'
import profileImage from '../../../images/profile_image.jpg'

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, orderByChild, equalTo, query } from "firebase/database";
import firebaseConfig from "../../../FirebaseConfig";

class Users extends React.Component{

    constructor(){
        super();
        this.change = this.change.bind(this);
        this.find = this.find.bind(this);
        this.format_date = this.format_date.bind(this);
        this.state = {
            text_number_auto: "Изменить",
            text_phone_number: "Изменить",
            showBooking: false,
            showInfo: "default"
        }
    }
    
    change = (str) => {
        if (str === 'number_auto') {
            if (this.state.text_number_auto === "Изменить") {
                document.getElementById(str).disabled = false;
                this.setState({text_number_auto: "Сохранить"})
            } else {
                document.getElementById(str).disabled = true;
                this.setState({text_number_auto: "Изменить"})
            }
        } else {
            if (this.state.text_phone_number === "Изменить") {
                document.getElementById(str).disabled = false;
                this.setState({text_phone_number: "Сохранить"})
            } else {
                document.getElementById(str).disabled = true;
                this.setState({text_phone_number: "Изменить"})
            }
        }
    }

    format_date(local_time) {
        var pad = function(i) { return (i < 10) ? '0' + i : i; };
        let time = local_time.getFullYear() + '-' +
                        pad(local_time.getMonth() + 1) + '-' + pad(local_time.getDate()) + ' '
                        + pad(local_time.getHours()) + ':' + pad(local_time.getMinutes()) + ':' +
                        pad(local_time.getSeconds());
        return time
    }

    find = (email) => {
        const db = getDatabase(initializeApp(firebaseConfig));
        const starCountRef = query(ref(db, 'users'), orderByChild('email'), equalTo(email));

        get(starCountRef).then((snapshot) => {
            if (snapshot.exists()) {
              Object.entries(snapshot.val()).forEach(([key, value]) => {
                this.setState({showInfo: 'exist'})

                document.getElementById('number_auto').disabled = true;
                document.getElementById('account_balance').disabled = true;

                document.getElementById('user_id').innerHTML = key
                document.getElementById('user_email').innerHTML = value["email"]
                document.getElementById('user_name').innerHTML = value["meta_user_info"]["name"] 
                document.getElementById('user_phone_number').innerHTML = value["meta_user_info"]["phone_number"]  

                document.getElementById("number_auto").value = value["number_auto"]
                document.getElementById("account_balance").value = value["account_balance"]

                if (value["time_reservation"] !== "") {
                    this.setState({showBooking: true})

                    document.getElementById('address_booking').innerHTML = value["reservation_address"]
                    document.getElementById('place_booking').innerHTML = value["reservation_place"] + " место"

                    var percent = 0
                    if (value["time_reservation"] !== "") {
                        percent = 33

                        document.getElementById('label_time_booking').innerHTML = ""
                        document.getElementById('label_time_arrive').innerHTML = ""
                        document.getElementById('label_time_exit').innerHTML = ""

                        let time_reservation = this.format_date(new Date((value["time_reservation"]).split('.')[0] + ' UTC'))
                        document.getElementById('label_time_booking').innerHTML = time_reservation
                    }
                    if (value["time_arrive"] !== "") {
                        percent = 66

                        let time_arrive = this.format_date(new Date((value["time_arrive"]).split('.')[0] + ' UTC'))
                        document.getElementById('label_time_arrive').innerHTML = time_arrive
                    }
                    document.getElementById("progress_bar_id").setAttribute("style",`width:${percent}%; border-radius:20px 0 0 20px;`)
                    
                    if (value["time_exit"] !== "") {
                        percent = 100

                        let time_exit = this.format_date(new Date((value["time_exit"]).split('.')[0] + ' UTC'))
                        document.getElementById('label_time_exit').innerHTML = time_exit
                        document.getElementById('place_booking').innerHTML = "Выехал"
                        document.getElementById("progress_bar_id").setAttribute("style",`width:${percent}%; border-radius:20px;`)
                    }

                } else {
                    this.setState({showBooking: false})
                    document.getElementById('address_booking').innerHTML = ""
                    document.getElementById('place_booking').innerHTML = ""
                }
             });             
            } else {
                console.log("No data available");
                this.setState({showInfo: 'no_data'})
            }
          }).catch((error) => {
                console.error(error);
          });
    }
    
    render(){
        return (
        <>
            {(JSON.parse(sessionStorage.getItem('user')) === null) ? (
                <div className="welcome-user"> Авторизуйтесь! </div>
                ) : (
                    <>
                        <div className='window'>
                            <div className='label_users'>Пользователи</div>
                            <div>
                                <input type="text" className='dns' placeholder="Поиск" id='email_textfield'/>
                                <input type="button" value="Найти" className='button_find' onClick={() => {this.find(document.getElementById('email_textfield').value)}}/>
                            </div>
                            { (this.state.showInfo === 'exist') ?
                                <div className='all_inforamtion'>
                                    <div className='info_user'>
                                        <img src={profileImage} className="profile_image" />
                                        <div className='info_user_inner'>
                                            <div className='parent_element_info'>
                                                <div className='type_element_info'>Email</div>
                                                <div className='value_element_info' id='user_email'>lyutakivan802@gmail.com</div>
                                                <div className='type_element_info' style={{marginLeft: '10px'}}>ID</div>
                                                <div className='value_element_info' id='user_id' />
                                            </div>
                                            <div className='parent_element_info'>
                                                <div className='type_element_info'>Имя</div>
                                                <div className='value_element_info' id='user_name'>Ivan Lyutak</div>
                                            </div>
                                            <div className='parent_element_info'>
                                                <div className='type_element_info'>Телефон</div>
                                                <div className='value_element_info' id='user_phone_number'>+79151756404</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='line'/>
                                    <div className='main_info_user_inner'>
                                        <div className='parent_element_info'>
                                            <div className='main_type_element_info'>Номер авто</div>
                                            <input type="text" className='main_value_element_info' id='number_auto'/>
                                            <button type="button" className='button_fix' id='button_number_auto' onClick={() => {this.change('number_auto')}  }> {this.state.text_number_auto} </button>
                                        </div>
                                        <div className='parent_element_info'>
                                            <div className='main_type_element_info'>Баланс аккаунта</div>
                                            <input type="text" className='main_value_element_info' id='account_balance'/>
                                            <button type="button" className='button_fix' id='button_account_balance' onClick={() => {this.change('account_balance')}}> {this.state.text_phone_number} </button>
                                        </div>
                                    </div>
                                    <div className='line' />
                                    <div className='info_booking'>
                                        <div className='main_info_booking'>
                                            <div className='label_info_booking'>Информация о бронировании</div>
                                            <div className='label_address_booking' id='address_booking'></div>
                                            <div className='label_place_booking' id='place_booking'></div>
                                        </div>
                                        { this.state.showBooking ?
                                        <div className='general_info_booking'>
                                            <div className='progress_bar_booking'>
                                                    <div className='status_booking'>
                                                        <div className='label_booking'>Бронирование</div>
                                                        <div className='label_time' id='label_time_booking'></div>
                                                    </div>
                                                    <div className='status_arrive'>
                                                        <div className='label_booking'>Заезд на паркинг</div>
                                                        <div className='label_time' id='label_time_arrive'></div>
                                                    </div>
                                                    <div className='status_exit'>
                                                        <div className='label_booking'>Выезд из паркинга</div>
                                                        <div className='label_time' id='label_time_exit'></div>
                                                    </div>
                                                    <div className='progress_bar' id='progress_bar_id'></div>
                                            </div>
                                            <div className='buttons_booking'>
                                                <button type="button" className='button_next'> Далее </button>
                                                <button type="button" className='button_delete'> Удалить </button>
                                            </div>
                                        </div>
                                    : <div className='label_no_booking'>
                                        Пользователь не бронировал место
                                    </div> }
                                </div>  
                            </div>
                            :  (this.state.showInfo === 'default') ?
                            <div className='label_no_booking'>
                                Поиск информации о пользователях General Parking
                            </div> : <div className='label_no_booking'>
                                Нет данных
                            </div>
                            }
                        </div>
                    </>
                )}
            </>
        )
    }
}

export default Users
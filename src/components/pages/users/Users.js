import React from 'react'
import './Users.css'
import profileImage from '../../../images/profile_image.jpg'

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, orderByChild, equalTo, query, update, set } from "firebase/database";
import firebaseConfig from "../../../FirebaseConfig";

class Users extends React.Component{

    constructor(){
        super();
        this.change_account_balance = this.change_account_balance.bind(this);
        this.change_number_auto = this.change_number_auto.bind(this);
        this.find = this.find.bind(this);
        this.find_data = this.find_data.bind(this);
        this.delete_booking = this.delete_booking.bind(this);
        this.format_date = this.format_date.bind(this);
        this.state = {
            text_number_auto: "Изменить",
            text_account_balance: "Изменить",
            showBooking: false,
            showInfo: "default",
            current_uid: "",
            current_email: ""
        }
    }
    
    change_number_auto = () => {
        if (this.state.text_number_auto === "Изменить") {
            document.getElementById("number_auto").disabled = false;
            this.setState({text_number_auto: "Сохранить"})
        } else {
            const db = getDatabase(initializeApp(firebaseConfig));
            const updates = {};
            updates['/users/' + this.state.current_uid + '/number_auto'] = document.getElementById("number_auto").value ;
            update(ref(db), updates);
            document.getElementById("number_auto").disabled = true;
            this.setState({text_number_auto: "Изменить"})
        }
    }

    change_account_balance = () => {
        if (this.state.text_account_balance === "Изменить") {
            document.getElementById("account_balance").disabled = false;
            this.setState({text_account_balance: "Сохранить"})
        } else {
            const db = getDatabase(initializeApp(firebaseConfig));
            const updates = {};
            updates['/users/' + this.state.current_uid + '/account_balance'] = Number(document.getElementById("account_balance").value) ;
            update(ref(db), updates);
            document.getElementById("account_balance").disabled = true;
            this.setState({text_account_balance: "Изменить"})
        }
    }

    delete_booking = () => {
        if (this.state.current_uid !== "") {
            const db = getDatabase(initializeApp(firebaseConfig));
            let user_ref = ref(db, 'users/'+ this.state.current_uid);
            get(user_ref).then((snapshot) => {
                let data = snapshot.val()
                let parking_ref = ref(db, 'parking/'+ data.reservation_address + "/" + data.reservation_level + '/places');
                get(parking_ref).then((snapshot_parking) => {
                    let places = snapshot_parking.val()
                    for(let [key, value] of Object.entries(places)) {
                        if (value["reservation"] === this.state.current_uid) {
                            let place_parking = {
                                name: value["name"],
                                reservation: " ",
                                rotate: value["rotate"],
                                value: 0,
                                x: value["x"],
                                y: value["y"]
                            }
                            set(ref(db, 'parking/'+ data.reservation_address + "/" + data.reservation_level + '/places/' + key), place_parking)
                            
                            data.time_reservation = ""
                            data.time_arrive = ""
                            data.time_exit = ""
                            data.reservation_address = ""
                            data.reservation_place = ""
                            data.reservation_level = ""
                            data.arrive = ""
                            data.exit = ""
                            set(ref(db, 'users/' + this.state.current_uid), data)
                            this.setState({showBooking: false})
                        }
                    }
                })
            })
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
        this.find_data(starCountRef)
        
    }
    
    find_data(starCountRef) {
        get(starCountRef).then((snapshot) => {
            if (snapshot.exists()) {
              Object.entries(snapshot.val()).forEach(([key, value]) => {
                this.setState({showInfo: 'exist'})

                document.getElementById('number_auto').disabled = true;
                document.getElementById('account_balance').disabled = true;

                document.getElementById('user_id').innerHTML = key
                this.setState({current_uid: key})

                document.getElementById('user_email').innerHTML = value["email"]
                this.setState({current_umail: value["email"]})

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
                                            <button type="button" className='button_fix' id='button_number_auto' onClick={this.change_number_auto}> {this.state.text_number_auto} </button>
                                        </div>
                                        <div className='parent_element_info'>
                                            <div className='main_type_element_info'>Баланс аккаунта</div>
                                            <input type="text" className='main_value_element_info' id='account_balance'/>
                                            <button type="button" className='button_fix' id='button_account_balance' onClick={this.change_account_balance}> {this.state.text_account_balance} </button>
                                        </div>
                                    </div>
                                    <div className='line' />
                                    <div className='info_booking'>
                                        <div className='main_info_booking'>
                                            <div className='label_info_booking'>Информация о бронировании</div>
                                            { this.state.showBooking ?
                                            <>
                                                <div className='label_address_booking' id='address_booking'></div>
                                                <div className='label_place_booking' id='place_booking'></div>
                                            </>
                                            : null
                                            }    
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
                                                <button type="button" className='button_next'> Пропустить </button>
                                                <button type="button" className='button_delete' onClick={this.delete_booking}> Удалить </button>
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
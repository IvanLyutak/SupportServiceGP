import React from 'react'
import './Users.css'
import profileImage from '../../../images/profile_image.jpg'

class Users extends React.Component{

    constructor(){
        super();
        this.change = this.change.bind(this);
        this.state = {
            text_number_auto: "Изменить",
            text_phone_number: "Изменить"
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

    componentDidMount() {
        document.getElementById('number_auto').disabled = true;
        document.getElementById('phone_number').disabled = true;
        document.getElementById("number_auto").value = "A926ME142";
        document.getElementById("phone_number").value = "+79151756404";
        document.getElementById("progress_bar_id").setAttribute("style","width:66%; border-radius:20px 0 0 20px;")
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
                                <input type="text" className='dns' placeholder="Поиск"/>
                                <input type="button" value="Найти" className='button_find'/>
                            </div>
                            <div className='info_user'>
                                <img src={profileImage} className="profile_image" />
                                <div className='info_user_inner'>
                                    <div className='parent_element_info'>
                                        <div className='type_element_info'>Email</div>
                                        <div className='value_element_info'>lyutakivan802@gmail.com</div>
                                        <div className='type_element_info' style={{marginLeft: '10px'}}>ID</div>
                                        <div className='value_element_info'>dfbjsdvhavfhvaehvshvhsdvgvdsgv</div>
                                    </div>
                                    <div className='parent_element_info'>
                                        <div className='type_element_info'>Имя</div>
                                        <div className='value_element_info'>Ivan Lyutak</div>
                                    </div>
                                    <div className='parent_element_info'>
                                        <div className='type_element_info'>Телефон</div>
                                        <div className='value_element_info'>+79151756404</div>
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
                                    <input type="text" className='main_value_element_info' id='phone_number'/>
                                    <button type="button" className='button_fix' id='button_phone_number' onClick={() => {this.change('phone_number')}}> {this.state.text_phone_number} </button>
                                </div>
                            </div>
                            <div className='line' />
                            <div className='info_booking'>
                                <div className='main_info_booking'>
                                    <div className='label_info_booking'>Информация о бронировании</div>
                                    <div className='label_address_booking'>Большой Саввинский переулок, 11</div>
                                    <div className='label_place_booking'>85 место</div>
                                </div>
                                <div className='general_info_booking'>
                                    <div className='progress_bar_booking'>
                                            <div className='status_booking'>
                                                <div className='label_booking'>Бронирование</div>
                                                <div className='label_time' id='label_time_booking'>13:07:21 21 марта 2022</div>
                                            </div>
                                            <div className='status_arrive'>
                                                <div className='label_booking'>Заезд на паркинг</div>
                                                <div className='label_time' id='label_time_arrive'>14:07:21 21 марта 2022</div>
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
                            </div>
                        </div>
                    </>
                )}
            </>
        )
    }
}

export default Users
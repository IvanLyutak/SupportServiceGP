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
                        </div>
                    </>
                )}
            </>
        )
    }
}

export default Users
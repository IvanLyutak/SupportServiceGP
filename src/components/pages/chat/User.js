import React, { useState, useEffect } from 'react'

import Moment from "react-moment";
import './Chat.css'


 const User = ({ user, selectUser }) => {

    
        return (
            <div className='user_wrapper' onClick={() => selectUser(user)}>
                <div className='user_info'>
                    <div className='user_detail'>

                        <div className='user_email'>
                            <h6>{ user.email}</h6>
                        </div>

                        <div className='user_text'>
                            <h6>{ user.text}</h6>
                        </div>


                        <div className='user_timestamp'>
                            <small>
                                <Moment format="HH:mm D MMM" unix>{ user.timestamp }</Moment>
                            </small>
                        </div>





                    </div>
                </div>
            </div>
        )
}

export default User
import React from 'react'


 const User = ({ user, selectUser }) => {
    
        return (
            <div className='user_wrapper' onClick={() => selectUser(user)}>
                <div className='user_info'>
                    <div className='user_detail'>
                        <h6>{ user.email}</h6>
                    </div>
                </div>
            </div>
        )
}

export default User
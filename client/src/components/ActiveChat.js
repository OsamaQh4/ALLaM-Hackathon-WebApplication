import React from 'react';
import IsnadUser from '../assets/isnad_user.png';
import YouUser from '../assets/you_user.png';

const ActiveChat = ({ messages }) => {
    return (
        <div className='flex flex-col overflow-hidden'>
            <div className='text-right' dir='rtl'>
                {messages.map((message, index) => (
                    <div key={index} className={`flex flex-col gap-2 pb-7 ${message.sender === 'user' ? 'user-message' : 'model-message'}`}>
                        <div className='flex flex-row gap-4'>
                            <img src={message.sender === 'user' ? YouUser : IsnadUser} className='rounded-full' alt='User/Sys pfp'/>
                            <strong>
                                {message.sender === 'user' ? 'أنت' : 'إسناد'}
                            </strong>
                        </div> 
                        <p>
                            {message.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActiveChat;
import React from 'react';

const MessageBubble = ({ message }) => {
    return (
        <div className={`message-bubble ${message.sender === 'user' ? 'sent' : 'received'}`}>
            <p>{message.text}</p>
        </div>
    );
};

export default MessageBubble;

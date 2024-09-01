import React from 'react';

const ChatList = ({ chats, activeChatId, onChatClick, onDeleteChat }) => {
    return (
        <div className="chat-list">
            {chats.map(chat => (
                <div
                    key={chat.id}
                    className={`chat-list-item ${chat.id === activeChatId ? 'active' : ''}`}
                >   
                
                    <div className="chat-details" onClick={() => onChatClick(chat.id)}>
                        
                        <div className="chat-name">
                            
                            {chat.name}
                          
                        </div>
                        
                        <div className="chat-last-message">
                            {chat.messages[chat.messages.length - 1].text}
                        </div>
                        <div className="chat-last-date">
                                10/20/2024
                        </div>
                    </div>
                    
                    
                    <button className="delete-chat" onClick={() => onDeleteChat(chat.id)}>
                        &#10005;
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ChatList;

import React from 'react';

const ChatControls = ({ clearChatHistory }) => {
    return (
        <div className="chat-controls">
            <button onClick={clearChatHistory} className="clear-button">
            </button>
        </div>
    );
};

export default ChatControls;

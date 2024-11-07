import React, { useState } from 'react';
import ChatBar from './ChatBar';
import ActiveChat from './ActiveChat';

const MainChat = ({ messages, setMessages, currentChat, setCurrentChat, previousConvs, setPreviousConvs }) => {
    const [input, setInput] = useState('');

    const handleSend = async (input) => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return; // Prevent sending empty messages
    
        // Create a user message object
        const userMessage = { sender: 'user', text: trimmedInput };
    
        // Update messages state with the user's input
        const newMessages = [...messages, userMessage];
        setMessages(newMessages); // Set updated messages
        setCurrentChat((prevChat) => ({ ...prevChat, messages: newMessages }));

        // Save the chat in `previousConvs` if it's the first message
        if (newMessages.length === 1) {
            const newChat = { ...currentChat, messages: newMessages };
            setPreviousConvs((prev) => {
                const existingChatIndex = prev.findIndex((chat) => chat.id === newChat.id);
                if (existingChatIndex !== -1) {
                    // Update existing chat
                    const updatedConvs = [...prev];
                    updatedConvs[existingChatIndex] = newChat;
                    return updatedConvs;
                } else {
                    // Add as a new chat
                    return [...prev, newChat];
                }
            });
        }

        // Update local storage with current chat
        localStorage.setItem('chatHistory', JSON.stringify(newMessages));

        try {
            const conversationHistory = newMessages
                .map((msg) => (msg.sender === 'user' ? `<s> [INST]${msg.text}[/INST]` : msg.text))
                .join(' ') + ` <s> [INST]${trimmedInput}[/INST]`;

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input: conversationHistory.trim(),
                    model_id: 'sdaia/allam-1-13b-instruct',
                }),
            });

            if (!response.ok) throw new Error('Error generating text');

            const { generated_text } = await response.json();
            const modelMessage = { sender: 'model', text: generated_text.trim() };

            const updatedMessages = [...newMessages, modelMessage];
            setMessages(updatedMessages);
            setCurrentChat((prevChat) => ({ ...prevChat, messages: updatedMessages }));
            localStorage.setItem('chatHistory', JSON.stringify(updatedMessages));
        } catch (error) {
            console.error(error);
            const errorMessage = { sender: 'model', text: 'فشل في توليد النص' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }

        setInput('');
    };

    const clearChatHistory = () => {
        setMessages([]);
        localStorage.removeItem('chatHistory');
    };

    return (
        <div className='flex-grow relative place-items-center gap-7 p-24'>
            <div className='absolute overflow-y-scroll h-full p-24 bottom-4 left-0 right-0'>
                <ActiveChat messages={messages} />
            </div>
            <ChatBar input={input} setInput={setInput} handleSend={handleSend} clearChatHistory={clearChatHistory} />
        </div>
    );
};

export default MainChat;

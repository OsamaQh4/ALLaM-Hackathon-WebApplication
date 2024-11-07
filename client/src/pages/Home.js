import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainChat from '../components/MainChat';
import Header from '../components/Header';
import History from '../components/History';

export const Home = () => {
    const navigate = useNavigate();

    const [currentChat, setCurrentChat] = useState(() => {
        const savedChat = localStorage.getItem('currentChat');
        return savedChat ? JSON.parse(savedChat) : { id: Date.now(), messages: [] };
    });

    const [previousConvs, setPreviousConvs] = useState(() => {
        const savedConversations = localStorage.getItem('previousConvs');
        return savedConversations ? JSON.parse(savedConversations) : [];
    });

    useEffect(() => {
        localStorage.setItem('currentChat', JSON.stringify(currentChat));
    }, [currentChat]);

    useEffect(() => {
        localStorage.setItem('previousConvs', JSON.stringify(previousConvs));
    }, [previousConvs]);

    const handleNewConversation = () => {
        if (currentChat.messages.length > 0) {
            setPreviousConvs((prev) => {
                const existingChatIndex = prev.findIndex((chat) => chat.id === currentChat.id);
                if (existingChatIndex !== -1) {
                    const updatedConvs = [...prev];
                    updatedConvs[existingChatIndex] = currentChat;
                    return updatedConvs;
                } else {
                    return [...prev, currentChat];
                }
            });
        }

        const newChatId = Date.now();
        setCurrentChat({ id: newChatId, messages: [] });
        navigate(`/c/${newChatId}`);
    };

    const loadChat = (chat) => {
        if (currentChat.messages.length > 0) {
            setPreviousConvs((prev) => {
                const existingChatIndex = prev.findIndex((c) => c.id === currentChat.id);
                if (existingChatIndex !== -1) {
                    const updatedConvs = [...prev];
                    updatedConvs[existingChatIndex] = currentChat;
                    return updatedConvs;
                } else {
                    return [...prev, currentChat];
                }
            });
        }
        setCurrentChat(chat);
        navigate(`/c/${chat.id}`);
    };

    const deleteChat = (chatId) => {
        const updatedConversations = previousConvs.filter(chat => chat.id !== chatId);
        setPreviousConvs(updatedConversations);
    };

    return (
        <div className='bg-[#F8F3EB] h-screen flex flex-col'>
            <Header />
            <div className='flex flex-row-reverse text-right flex-grow overflow-hidden'>
                <History
                    previousConvs={previousConvs}
                    loadChat={loadChat}
                    handleNewConversation={handleNewConversation}
                    deleteChat={deleteChat}
                />
                <MainChat
                    messages={currentChat.messages}
                    setMessages={(messages) => setCurrentChat({ ...currentChat, messages })}
                    currentChat={currentChat}
                    setCurrentChat={setCurrentChat}
                    previousConvs={previousConvs}
                    setPreviousConvs={setPreviousConvs}
                />
            </div>
        </div>
    );
};

export default Home;

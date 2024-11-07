import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [previousConvs, setPreviousConvs] = useState(() => {
    // Load previous conversations from localStorage if they exist
    const savedConvs = localStorage.getItem('previousConvs');
    return savedConvs ? JSON.parse(savedConvs) : [];
  });
  const [currentChat, setCurrentChat] = useState({
    id: Date.now(), // Start with a new chat ID
    messages: [],    // Start with an empty message history
  });

  // Save previous conversations to localStorage when it changes
  React.useEffect(() => {
    localStorage.setItem('previousConvs', JSON.stringify(previousConvs));
  }, [previousConvs]);

  return (
    <ChatContext.Provider value={{ currentChat, setCurrentChat, previousConvs, setPreviousConvs }}>
      {children}
    </ChatContext.Provider>
  );
};

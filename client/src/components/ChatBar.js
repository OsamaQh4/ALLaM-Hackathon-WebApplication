import React, { useRef, useState, useEffect } from 'react';
import { FiTrash } from 'react-icons/fi';
import Send from '../assets/Send.png';

const ChatBar = ({ input, setInput, handleSend, clearChatHistory }) => {
    const [text, setText] = useState('');
    const textareaRef = useRef(null);

    // Function to auto-resize the textarea based on content
    const autoResizeTextarea = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        autoResizeTextarea();
    }, [text]);

    const onSubmit = (e) => {
        e.preventDefault();
        handleSend(text);
        setText('');
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            // Prevent default "Enter" behavior in textarea and submit
            event.preventDefault();
            onSubmit(event);
        }
    };

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-row-reverse items-center bg-[#F9FAFA] absolute inset-x-0 bottom-12 rounded-full shadow-md px-3 py-3 w-full max-w-2xl gap-2 justify-self-center"
        >
            {/* Clear Chat History Button */}
            <button
                type="button"
                onClick={clearChatHistory}
                className="text-red-600" // Optional: Add styling for the clear button
            >
                <FiTrash />
            </button>

            {/* Input Field */}
            <textarea
                ref={textareaRef}
                placeholder="اكتب رسالة جديدة"
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}  // Handles Enter and Shift+Enter
                rows={1}
                className="flex-grow bg-[#F9FAFA] outline-none text-right text-[#6B4E45] placeholder-[#bea271] px-2 resize-none"
                dir='rtl'
            ></textarea>

            {/* Send Icon */}
            <button type="submit" className="text-[#6B4E45] ml-2">
                <img src={Send} alt='Send Sign' className='size-7' />
            </button>
        </form>
    );
};

export default ChatBar;

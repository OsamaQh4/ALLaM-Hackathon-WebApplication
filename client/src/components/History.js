import PlusSign from '../assets/plusSign.png';
import { Link } from 'react-router-dom';
import { FiTrash } from 'react-icons/fi';

const History = ({ previousConvs, loadChat, handleNewConversation, deleteChat }) => {
    // Function to truncate the first message for display
    const truncateMessage = (message) => {
        const words = message.split(' ');
        // Truncate if message has more than 3 words and add "..."
        if (words.length > 3) {
            return words.slice(0, 3).join(' ') + '...';
        }
        return message;
    };

    // Function to get the time difference between now and the chat's timestamp
    const getTimeCategory = (timestamp) => {
        const now = new Date();
        const diffInMs = now - new Date(timestamp); // Time difference in milliseconds
        const diffInDays = diffInMs / (1000 * 3600 * 24); // Convert to days

        if (diffInDays < 1) {
            return 'Today';
        } else if (diffInDays < 2) {
            return 'Yesterday';
        } else if (diffInDays < 7) {
            return 'Last 7 Days';
        } else if (diffInDays < 30) {
            return 'Last 30 Days';
        } else {
            return 'Older';
        }
    };

    // Group the previousConvs based on time category
    const groupedChats = {
        Today: [],
        Yesterday: [],
        'Last 7 Days': [],
        'Last 30 Days': [],
        Older: []
    };

    previousConvs.forEach((chat) => {
        const timeCategory = getTimeCategory(chat.id); // Use chat.id as timestamp
        groupedChats[timeCategory].push(chat);
    });
    // Map English categories to Arabic
    const timeCategoryMap = {
        Today: "اليوم",
        Yesterday: "البارحة",
        'Last 7 Days': "قبل 7 أيام",
        'Last 30 Days': "قبل 30 يوم",
        Older: "أقدم",
    };
    return (
        <div className='bg-[#6B4E45] flex-none h-full rounded-ss-3xl p-7 flex flex-col shadow-lg shadow-black place-items-center gap-4'>
            <div className='flex flex-col gap-7 h-full'>
                <div className='flex flex-row-reverse gap-8 items-center justify-center'>
                    <h2 className='text-[#F4EADA] font-bold text-2xl'>الرسائل السابقة</h2>
                    <button className='rounded-lg' onClick={handleNewConversation}>
                        <img src={PlusSign} alt='Plus Sign' />
                    </button>
                </div>
                <div className='flex-grow'>
                    {Object.keys(groupedChats).map((timeCategory) => (
                        groupedChats[timeCategory].length > 0 && (
                            <div key={timeCategory} className="mb-4">
                                <h3 className="text-[#F4EADA] font-semibold text-xl" dir='rtl'>{timeCategoryMap[timeCategory]}</h3>
                                <ul>
                                    {groupedChats[timeCategory].map((chat) => (
                                        <div key={chat.id} className="flex items-center text-[#F4EADA] justify-between p-2 hover:bg-[#ffffff] hover:text-[#493628] rounded" dir='rtl'>
                                            <span onClick={() => loadChat(chat)} className="cursor-pointer">
                                                {/* Display the truncated version of the first message */}
                                                {`${truncateMessage(chat.messages[0]?.text || '')}`}
                                            </span>
                                            <button
                                                onClick={() => deleteChat(chat.id)}
                                                 className="text-red-600 rounded"
                                            >
                                                <FiTrash />
                                            </button>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        )
                    ))}
                </div>
            </div>
            <div className='items-center py-7 underline text-lg'>
                <Link to="/about">من نحن</Link>
            </div>
        </div>
    );
};

export default History;
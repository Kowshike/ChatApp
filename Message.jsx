import React from "react";

const Message = ({
    isOfUser = false,
    text = 'initially empty',
    imageSource = '', // Ensure imageSource is a valid image URL or placeholder
    userName,
    createdAt
}) => {
    const formattedDate = new Date(createdAt);
    const dateString = formattedDate.toDateString();
    const timeString = formattedDate.toLocaleTimeString();

    return (
        <div className={`bg-transparent w-full flex text-white gap-2 text-sm mb-2 ${isOfUser ? 'justify-end' : 'justify-start'}`}>
            {
                !isOfUser && (
                    <div className="rounded-full overflow-hidden w-[2.5rem] h-[2.5rem] bg-gray-300">
                        <img 
                            src={imageSource || 'https://via.placeholder.com/150'} // Use placeholder if no imageSource
                            alt="avatar" 
                            className="w-full h-full object-cover" // Ensure the image fills the space properly
                        />
                    </div>
                )
            }
            <div className="w-[15rem] p-4 text-start bg-blue-600 rounded-xl h-auto relative pb-8">
                {/* Display the user name here */}
                <div className="font-bold mb-2">{userName}</div>
                {text}
                <div className={`bottom-2 text-xs font-light absolute ${!isOfUser ? 'right-4' : 'left-4'}`}>
                    {dateString} {timeString}
                </div>
            </div>
            {
                isOfUser && (
                    <div className="rounded-full overflow-hidden w-[2.5rem] h-[2.5rem] bg-gray-300">
                        <img 
                            src={imageSource || 'https://via.placeholder.com/150'} // Use placeholder if no imageSource
                            alt="avatar" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                )
            }
        </div>
    );
};

export default Message;

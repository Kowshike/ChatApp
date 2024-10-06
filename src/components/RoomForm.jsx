import React, { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './RoomForm.css';  // Import the CSS file

const RoomForm = ({ setCurrentRoom }) => {
    let inputRef = useRef(null);
    const [value, setValue] = useState();
    const navigate = useNavigate();

    // Video call code
    const handleJoinVC = useCallback(() => {
        navigate(`/room/${value}`);
    }, [navigate, value]);

    // Generate random stars for the background
    const generateStars = (numStars) => {
        let stars = [];
        for (let i = 0; i < numStars; i++) {
            let randomX = Math.floor(Math.random() * 100) + "%";
            let randomY = Math.floor(Math.random() * 100) + "%";
            let duration = Math.random() * 5 + 3; // Random duration for each star
            let starStyle = {
                top: randomY,
                left: randomX,
                animationDuration: `${duration}s`,
            };
            stars.push(<div key={i} className="star" style={starStyle}></div>);
        }
        return stars;
    };

    // Falling stars generator
    const generateFallingStars = (numStars) => {
        let fallingStars = [];
        for (let i = 0; i < numStars; i++) {
            let randomX = Math.floor(Math.random() * 100) + "%";
            let duration = Math.random() * 4 + 4; // Random duration for falling stars
            let starStyle = {
                left: randomX,
                animationDuration: `${duration}s`,
            };
            fallingStars.push(<div key={i} className="falling-star" style={starStyle}></div>);
        }
        return fallingStars;
    };

    return (
        <div className="w-full h-full flex p-6 gap-10 items-center justify-center flex-row">
            {/* Box 1 */}
            <div className="box-container w-[26rem] h-[24rem] flex flex-col justify-center items-center gap-6 bg-blue-800 rounded-2xl relative overflow-hidden">
                {/* Star and falling star layers */}
                <div className="stars">{generateStars(30)}</div>
                <div className="falling-stars">{generateFallingStars(10)}</div>

                <h3 className="font-semibold text-2xl text-white tracking-wide z-10">
                    Enter Room ID to Join
                </h3>
                <input
                    autoFocus
                    ref={inputRef}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            setCurrentRoom(inputRef.current.value);
                        }
                    }}
                    type="text"
                    placeholder="Enter Room ID . . ."
                    className="p-3 font-medium text-lg text-gray-700 focus:outline-none border-2 border-gray-400 rounded-lg focus:ring-4 focus:ring-blue-300 w-[20rem] transition-all z-10"
                />
                <button
                    onClick={() => setCurrentRoom(inputRef.current.value)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 z-10"
                >
                    Enter Room
                </button>
            </div>

            {/* Box 2 */}
            <div className="box-container w-[26rem] h-[24rem] flex flex-col justify-center items-center gap-6 bg-blue-800 rounded-2xl relative overflow-hidden">
                {/* Star and falling star layers */}
                <div className="stars">{generateStars(30)}</div>
                <div className="falling-stars">{generateFallingStars(10)}</div>

                <h3 className="font-semibold text-2xl text-white tracking-wide z-10">
                    Enter Room ID to Join Video Call
                </h3>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                    placeholder="Enter Room ID . . ."
                    className="p-3 font-medium text-lg text-gray-700 focus:outline-none border-2 border-gray-400 rounded-lg focus:ring-4 focus:ring-blue-300 w-[20rem] transition-all z-10"
                />
                <button
                    onClick={handleJoinVC}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 z-10"
                >
                    Enter Call
                </button>
            </div>
        </div>
    );
};

export default RoomForm;

import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import Message from "./Message";

const Chat = ({ room, setCurrentRoom }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        if (message.trim() === "") {
            alert("Enter valid message");
            return;
        }
        console.log(auth.currentUser);
        // Get current user's information
        const { uid, displayName, photoURL } = auth.currentUser;

        // Debugging: Check if photoURL is present
        console.log("Photo URL:", photoURL);

        // Send message to Firestore
        await addDoc(collection(db, room), {
            text: message,
            name: displayName, // Storing username
            avatar: photoURL || '', // Storing user profile picture, handle empty case
            createdAt: Date.now(),
            uid
        });

        setMessage('');

        // Scroll to the bottom of the messages
        scrollRef.current.scroll({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    };

    useEffect(() => {
        const q = query(
            collection(db, room),
            orderBy("createdAt"),
            limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let theseMessages = [];
            QuerySnapshot.forEach((doc) => {
                theseMessages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(theseMessages);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        scrollRef.current.scroll({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    let scrollRef = useRef(null);

    return (
        <div className="mt-4 w-full border-2 bg-slate-200 shadow-xl rounded-xl p-4 h-[80%] flex flex-col relative">
            <div onClick={() => setCurrentRoom('')} className="absolute left-1 top-1 p-3 text-white bg-red-500 rounded-xl text-xm z-[30]">
                Exit Room
            </div>
            <br />
            <div className="w-full overflow-auto h-[90%] pt-10" ref={scrollRef}>
                {
                    messages?.map(curr => {
                        return (
                            <Message
                                key={curr.id} // Change key to curr.id to avoid duplicate key issues
                                userName={curr.name} // Pass user name from Firebase
                                text={curr.text}
                                imageSource={curr.avatar || ''} // Pass user avatar from Firebase, handle missing avatar
                                isOfUser={auth.currentUser.uid === curr.uid} // Compare user ID instead of displayName
                                createdAt={curr.createdAt}
                            />
                        )
                    })
                }
            </div>
            <div className="w-full rounded-lg text-sm flex justify-between absolute bottom-2 left-0 px-2 gap-2">
                <input 
                    type="text" 
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') sendMessage()
                    }} 
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 p-3 overflow-auto border-2 rounded-xl"
                    autoFocus 
                    value={message} 
                    placeholder="Enter Text..." 
                />
                <button onClick={sendMessage} className="border-2 p-3 rounded-xl bg-green-600 text-white">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;

import React, { useEffect, useState } from "react";
import './Zego.css';
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { getAuth } from "firebase/auth"; // Assuming Firebase is used for authentication

const RoomPage = () => {
    const { roomID } = useParams();
    const [userProfile, setUserProfile] = useState({ name: '', avatar: '' });

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            // Retrieve user's displayName and photoURL from Firebase Authentication
            setUserProfile({
                name: user.displayName || 'Unknown User', // Use fallback if name isn't available
                avatar: user.photoURL || 'default-avatar-url', // Use fallback avatar if not available
            });
        }
    }, []);

    const myMeeting = async (element) => {
        const appID = 755684221;
        const serverSecret = "d6276d5d1b3e600c65deca3b38c0b0616";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(), userProfile.name);
        
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: `http://localhost:3008/room/${roomID}`,
                },
            ],
            user: {
                userID: Date.now().toString(), // unique ID for the user
                userName: userProfile.name, // Name displayed in the chat
                avatar: userProfile.avatar, // Pass the user's avatar URL here
            },
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },
            showScreenSharingButton: true,
        });
    };

    return (
        <div className="vc">
            <div ref={myMeeting} className="meeting" />
        </div>
    );
};

export default RoomPage;

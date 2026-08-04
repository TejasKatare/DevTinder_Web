import { useLocation, useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const userPhotoUrl = user?.photoUrl;
  const userFirstName = user?.firstName;

  const location = useLocation();
  const { targetPhotoUrl, targetFirstName } = location.state || {};

  const fetchMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/get/" + targetUserId, {
        withCredentials: true,
      });
      console.log(chat.data.messages);
      setMessages(chat.data.messages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      userId,
      targetUserId,
    });

    socket.on("messageReceived", (message) => {
      //console.log("Message received:", { id, text });
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="justify-center items-center flex flex-1">
      <div className="w-10/12 h-[80vh] bg-base-300 rounded-3xl flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => {
            const isMyMessage = message.senderId === userId;
            return (
              <div
                key={index}
                className={`chat ${isMyMessage ? "chat-end" : "chat-start"} `}
              >
                <div className="chat-header">
                  {isMyMessage ? userFirstName : targetFirstName}
                </div>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={isMyMessage ? userPhotoUrl : targetPhotoUrl}
                    />
                  </div>
                </div>
                <div className="chat-bubble bg-base-100 text-white">
                  <p>{message.text}</p>

                  <div className="text-[10px] text-right opacity-70 mt-1">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
           <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <div className="p-4 flex gap-3 mt-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 p-3 bg-base-100 rounded-2xl outline-none border-none"
          />
          <button
            className="btn btn-primary bg-transparent outline-none border-none rounded-2xl"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

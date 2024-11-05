import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useChat } from "../../contexts/ChatContext";
import chatApiInstace from "../../utils/ApiInstance/chatApiInstance";
import Cookies from "js-cookie";
import userApiInstace from "../../utils/ApiInstance/userApiInstance";

function Chat() {
  const token = Cookies.get("_auth");
  const [senderId, setSenderId] = useState(null);
  const { receiverId } = useParams();
  const [socket, setSocket] = useState(null);
  const { messages, addMessage, setMessages } = useChat();
  const [message, setMessage] = useState({
    SenderId: senderId,
    ReceiverId: receiverId,
    Message: "",
  });
  const [receivedMessage, setReceivedMessage] = useState(null);

  // Ref to the chat container to auto-scroll
  const chatContainerRef = useRef(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (senderId !== null) {
      setMessage((prevMessage) => ({
        ...prevMessage,
        SenderId: senderId,
      }));
    }
  }, [senderId]);

  useEffect(() => {
    if (receiverId) {
      setMessage((prevMessage) => ({
        ...prevMessage,
        ReceiverId: receiverId,
      }));
    }
  }, [receiverId]);

  //fetch user
  const fetchUserData = () => {
    userApiInstace
      .get("/info", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data._data;

        setSenderId(data.id);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  //fetch chat conversation
  useEffect(() => {
    if (senderId && receiverId) {
      const fetchChatConversation = async () => {
        try {
          console.log(
            "Fetching chat for sender:",
            senderId,
            "receiver:",
            receiverId
          );
          const response = await chatApiInstace.get(
            `/conversation/${senderId}/${receiverId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // Initialize the messages in the global state (ChatContext)
          setMessages(response.data._data);
        } catch (error) {
          console.error("Error fetching chat conversation:", error);
        }
      };

      fetchChatConversation();
    }
  }, [senderId, receiverId, setMessages]);

  useEffect(() => {
    if (senderId && receiverId) {
      const webSocket = new WebSocket(
        `wss://localhost:7044/ws?SenderId=${senderId}&ReceiverId=${receiverId}`
      );

      webSocket.onopen = () => {
        console.log("WebSocket connection established");
      };

      webSocket.onmessage = (event) => {
        try {
          const response = JSON.parse(event.data);
          setReceivedMessage(response);
          console.log("Received message:", response);

          // Add the received message to the global chat state (ChatContext)
          addMessage({
            senderId: response.SenderId,
            receiverId: response.ReceiverId,
            message: response.Message,
          });
        } catch (e) {
          console.warn("Received non-JSON message:", event.data);
        }
      };

      webSocket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      setSocket(webSocket);

      return () => {
        webSocket.close();
      };
    }
  }, [senderId, receiverId, addMessage]);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Trigger scroll when messages update

  const sendMessage = () => {
    if (socket && message.Message !== "") {
      console.log(message);

      // Stringify the message object before sending
      socket.send(JSON.stringify(message));

      // Reset the message text but keep SenderId and ReceiverId
      setMessage({ ...message, Message: "" });
    }
  };

  return (
    <div>
      <div>
        {messages
          .slice()
          .reverse()
          .map((msg, index) => (
            <div key={index}>
              <strong>{msg.senderId === senderId ? "You" : "Other"}:</strong>{" "}
              {msg.message}
            </div>
          ))}
      </div>
      <input
        type="text"
        value={message.Message}
        onChange={(e) =>
          setMessage((prevMessage) => ({
            ...prevMessage,
            Message: e.target.value,
          }))
        }
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default Chat;

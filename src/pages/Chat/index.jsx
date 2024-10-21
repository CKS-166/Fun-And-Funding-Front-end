import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useChat } from "../../contexts/ChatContext";
import chatApiInstace from "../../utils/ApiInstance/chatApiInstance";
import Cookies from "js-cookie";

function Chat() {
  const token = Cookies.get("_auth");
  const { senderId, receiverId } = useParams();
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

  //fetch chat conversation
  useEffect(() => {
    const fetchChatConversation = async () => {
      try {
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
  }, [senderId, receiverId, setMessages]);

  useEffect(() => {
    const webSocket = new WebSocket(
      `wss://localhost:7044/ws?SenderId=${senderId}&ReceiverId=${receiverId}`
    );

    webSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    webSocket.onmessage = (event) => {
      console.log("Received message from server:", event.data);

      const response = JSON.parse(event.data);

      setReceivedMessage(response); // Optionally update the receivedMessage state

      // Add the received message to the global chat state (ChatContext)
      addMessage({
        senderId: response.SenderId,
        receiverId: response.ReceiverId,
        message: response.Message,
      });
    };

    webSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(webSocket);

    return () => {
      webSocket.close();
    };
  }, []);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Trigger scroll when messages update

  const sendMessage = () => {
    if (socket && message.Message !== "") {
      // Stringify the message object before sending
      socket.send(JSON.stringify(message));

      // const newMessage = {
      //   senderId: message.SenderId,
      //   receiverId: message.ReceiverId,
      //   message: message.Message,
      // };

      // // Immediately add the sent message to the global chat state
      // addMessage(newMessage);

      // Reset the message text but keep SenderId and ReceiverId
      setMessage({ ...message, Message: "" });
    }
  };

  return (
    <div>
      <h1>WebSocket Test</h1>
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

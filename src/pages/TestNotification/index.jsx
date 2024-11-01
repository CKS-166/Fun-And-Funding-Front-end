import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Cookies from "js-cookie";


const TestNotification = () => {
  const [connection, setConnection] = useState(null);

  const token = Cookies.get("_auth")

  useEffect(() => {
    const connect = async () => {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:7044/notificationHub', { accessTokenFactory: () => token })
        .withAutomaticReconnect()
        .build();

      connection.on('ReceiveNotification', (notification) => {
        console.log("New notification for you:", notification);
      });
      try {
        await connection.start();
        setConnection(connection);
      } catch (error) {
        console.error('Error connecting to SignalR hub:', error);
      }
    };

    connect();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  const handleSendNotification = async () => {
    if (connection) {
      try {
        const notification = {
          message: "Hello, this is a TEST notification!",
          date: new Date(),
          isRead: false,
        };

        const userIdList = ["4F3F0846-6E40-4CD7-83AA-8537CC26733D", "34AA3C57-B91F-4387-97C2-F68B50366B76"];


        const payload = {
          notification,
          userIds: userIdList,
        };

        await fetch('https://localhost:7044/api/notification/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    } else {
      console.error('Connection not established.');
    }
  };


  return (
    <div>
      <button onClick={handleSendNotification}>Send Notification</button>
    </div>
  );
};

export default TestNotification;

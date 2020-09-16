import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

import './App.css';
import axios from './axios';

import Chat from './Chat';
import Sidebar from './Sidebar';

function App() {

  const [messages, setMessages] =  useState([]);

  useEffect(() => {
    axios.get('/api/v1/messages/sync')
    .then(response => {
      console.log(response);
      setMessages(response.data);
    })
  }, []);

  useEffect(() => {
    const pusher = new Pusher('77590d34eeb84fd58081', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('insert', (newMessages) => {
      setMessages([...messages, newMessages]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;

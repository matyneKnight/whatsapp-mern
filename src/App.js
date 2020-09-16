import React, { useEffect } from 'react';
import Pusher from 'pusher-js'
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';

function App() {

  useEffect(() => {
    const pusher = new Pusher('77590d34eeb84fd58081', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('insert', (data) => {
      alert(JSON.stringify(data));
    });

  }, [])

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat  />
      </div>
    </div>
  );
}

export default App;

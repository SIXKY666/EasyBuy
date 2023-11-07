import './App.css'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
const socket = io('http://localhost:3000')

function App() {
  const rooms = [
    { value: 'room1', name: 'Room 1' },
    { value: 'room2', name: 'Room 2' },
    { value: 'room3', name: 'Room 3' },
  ]
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('room1');

  useEffect(() => {
    socket.emit("join", (room) => {
      socket.join(room);
    });

    socket.on('new-message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages,room])

  const sendMessage = () => {
    if (message) {
      socket.emit('sent-message', message);
      setMessage('');
      document.getElementById('input-field').value = '';
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setRoom(e.target.value);
  }

  return (
    <>
      <div className="chat">
        <div>
          <select value={room} onChange={handleChange}>
            {rooms.map((room, index) => (
              <option key={index} value={room.value}>{room.name}</option>
            ))}
            </select>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className='message'>
              <p>{message}</p>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Send Message" id="input-field" onChange={(e) => setMessage(e.target.value)} />
          <button className="submit-button" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  )
}

export default App

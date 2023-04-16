import React, { useState } from 'react'
import { Navbar } from '../Components/Navbar'
function Home() {
  
const [messages,setMessages] = useState<string[]>([])
const [message,setMessage] = useState<string>("")
  return (
    <div className='bg-gray-50 min-h-screen min-w-screen'>
      <Navbar/>
      <div className='mx-auto'>
        <input
        type='text'
        onChange={(e)=>{
          setMessage(e.target.value)
        }}
        placeholder='Enter a message'
        value={message}
        ></input>
        <button onClick={()=>{
          setMessages(messages.concat(message))
          setMessage("")
          }}>Add message</button>
      </div>
      {messages.map((msg)=>{
        return<p>{msg}</p>
      })}

    </div>
   
  )
}

export default Home
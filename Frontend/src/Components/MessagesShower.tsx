import React, { useEffect, useRef } from 'react';
import { MessageType, StateType, UserType } from '../Types';
import { useSelector } from 'react-redux';

interface Props {
  messages: MessageType[];
}

function MessagesShower({ messages }: Props) {
  const msgDivRef : any = useRef(null);
  const user  = useSelector<StateType>((state) => state.auth.user) as UserType;
  useEffect(() => {
    msgDivRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])
  
  return (
    <div className='w-full h-full flex flex-col justify-start p-4 overflow-y-auto' >
      {messages.map((message, index) => (
        <div
        ref={msgDivRef}
          key={index}
          className={`rounded-lg p-4 mb-4 max-w-60 ${
            message.userId == user.id ? 'bg-purple-800 text-white self-end text-right' : 'bg-purple-500 text-white self-start text-left'
          }`}
        >
          <p className="mb-2">{message.text}</p>
          <div className="text-xs text-right">
            <span>{message.userId == user.id ? 'You' : message.name}</span> -{' '}
            {new Date(message.createdAt).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessagesShower;

import { useState } from 'react';
import { addMemberByEmail, addMemberByPhone, createChatWithEmail, createChatWithPhone, createGroupApi } from '../Api';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { ChatType, StateType } from '../Types';
interface MemberType {
    chatId: number;
    userId: number;
    name: string;
  }
interface Props{
    setMembers: React.Dispatch<React.SetStateAction<MemberType[]>>
    members:MemberType[]
}
export default function AddMember({setMembers,members}:Props) {
  const [activeTab, setActiveTab] = useState<string>('email');
  const [emailValue, setEmailValue] = useState<string>('');
  const [phoneValue, setPhoneValue] = useState<string>('');
  const selectedChat = useSelector<StateType>(
    (state) => state.selectChat.chat
  ) as ChatType;
  const handleTabClick = (tab:string) => {
    setActiveTab(tab);
  };

  const handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);

  };

  const handlePhoneInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(event.target.value);
  };
  const handleAddButtonClick = async() => {
    try {
        if (activeTab === 'email') {
            const data = await addMemberByEmail(emailValue,selectedChat.chatId);
            setMembers([...members,data])
            setEmailValue('');
          } else if(activeTab === 'phone'){
            const data = await addMemberByPhone(phoneValue,selectedChat.chatId)
            setMembers([...members,data])
            setPhoneValue('');
          }
    } catch (error) {
    }
  };

  return (
    <div className="mx-auto">
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 border-b-2 ${
            activeTab === 'email' ? 'border-purple-500 font-medium' : ''
          }`}
          onClick={() => handleTabClick('email')}
        >
          Email
        </button>
        <button
          className={`py-2 px-4 border-b-2 ${
            activeTab === 'phone' ? 'border-purple-500 font-medium' : ''
          }`}
          onClick={() => handleTabClick('phone')}
        >
          Phone
        </button>
      </div>

      {activeTab === 'email' && (
        <div>
          <input
            className="block w-full rounded-md border-gray-300 shadow-sm mb-4 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            type='email'
            placeholder="Email"
            value={emailValue}
            onChange={handleEmailInputChange}
          />
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-800 focus:outline-none focus:ring"
            onClick={handleAddButtonClick}
          >
            Add
          </button>
        </div>
      ) }{
        activeTab === 'phone' &&  (
          <div>
            <input
              className="block w-full rounded-md border-gray-300 shadow-sm mb-4 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              placeholder="Phone"
              type='tel'
              value={phoneValue}
              onChange={handlePhoneInputChange}
              maxLength={10}
              minLength={10}
            />
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-800 focus:outline-none focus:ring"
              onClick={handleAddButtonClick}
            >
              Add
            </button>
          </div>
        )
      }
    </div>
  );
}

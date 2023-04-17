import { useState } from 'react';
import { createChatWithEmail, createChatWithPhone } from '../Api';
interface props{
    setModal:React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddCHatChildren({setModal}:props) {
  const [activeTab, setActiveTab] = useState('email');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');

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
            const data = await createChatWithEmail(emailValue);
          } else {
            const data = await createChatWithPhone(phoneValue);
          }
    } catch (error) {
    }
  };

  return (
    <div className="max-w-md mx-auto">
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

      {activeTab === 'email' ? (
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
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-800 focus:outline-none focus:ring float-right"
            onClick={()=>{setModal(false)}}
          >
            Close
          </button>
        </div>
      ) : (
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
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-800 focus:outline-none focus:ring float-right"
            onClick={()=>{setModal(false)}}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { createChatWithEmail, createChatWithPhone, createGroupApi } from '../Api';
import { useNavigate } from 'react-router';
interface props{
    setModal:React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddCHatChildren({setModal}:props) {
  const [activeTab, setActiveTab] = useState<string>('email');
  const [emailValue, setEmailValue] = useState<string>('');
  const [phoneValue, setPhoneValue] = useState<string>('');
  const [groupName, setGroupName] = useState<string>("");
  const navigate = useNavigate();
  const handleTabClick = (tab:string) => {
    setActiveTab(tab);
  };

  const handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);

  };

  const handlePhoneInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(event.target.value);
  };
  const handleGroupInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  const handleAddButtonClick = async() => {
    try {
        if (activeTab === 'email') {
            const data = await createChatWithEmail(emailValue);
          } else if(activeTab === 'phone'){
            const data = await createChatWithPhone(phoneValue);
          } else{
            const data = await createGroupApi(groupName);
          }
          window.location.reload();
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
        <button
          className={`py-2 px-4 border-b-2 ${
            activeTab === 'group' ? 'border-purple-500 font-medium' : ''
          }`}
          onClick={() => handleTabClick('group')}
        >
          Group
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
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-800 focus:outline-none focus:ring float-right"
            onClick={()=>{setModal(false)}}
          >
            Close
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
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-800 focus:outline-none focus:ring float-right"
              onClick={()=>{setModal(false)}}
            >
              Close
            </button>
          </div>
        )
      }
      {
        activeTab === 'group' &&  (
          <div>
            <input
              className="block w-full rounded-md border-gray-300 shadow-sm mb-4 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              placeholder="Enter Group Name"
              type='tel'
              value={groupName}
              onChange={handleGroupInputChange}
              maxLength={20}
              minLength={3}
            />
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-800 focus:outline-none focus:ring"
              onClick={handleAddButtonClick}
            >
              Create Group
            </button>
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-800 focus:outline-none focus:ring float-right"
              onClick={()=>{setModal(false)}}
            >
              Close
            </button>
          </div>
        )
      }
    </div>
  );
}

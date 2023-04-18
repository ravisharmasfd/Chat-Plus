import React, { useEffect, useState } from "react";
import { getGroupInfoByChatId } from "../Api";
import { ChatType, StateType, UserType } from "../Types";
import { useSelector } from "react-redux";
import AddMember from "./Addmember";
interface MemberType {
  chatId: number;
  userId: number;
  name: string;
}
interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function GroupDetails({ setModal }: Props) {
  const [members, setMembers] = useState<MemberType[]>([]);
  const user = useSelector<StateType>((state) => state.auth.user) as UserType;
  const selectedChat = useSelector<StateType>(
    (state) => state.selectChat.chat
  ) as ChatType;
  const handleAddMember = () => {
    // Add a new member to the members array
    // setMembers([...members, { id: 'new-member-id', name: 'New Member' }]);
  };

  const handleRemoveMember = (userId: number) => {
    // Remove a member from the members array
    // setMembers(members.filter(member => member.id !== memberId));
  };

  async function fetchMember() {
    try {
      const data = await getGroupInfoByChatId(selectedChat.chatId);
      setMembers(data.members);
      console.log(data);
    } catch (error) {}
  }
  useEffect(() => {
    fetchMember();
  }, []);
  useEffect(() => {
    if (selectedChat.group == 0) setModal(false);
    console.log("is admin",user.id,selectedChat.admin)
  }, [selectedChat]);
  return (
    <div className="p-4 border h-full w-full rounded-lg z-40 flex flex-col">
      <div className="flex justify-between items-center bg-purple-100 duration-500 w-full h-[10%] rounded-xl p-4">
        <button
          onClick={() => setModal(false)}
          className="flex items-center justify-between px-2 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-purple-500 border border-transparent rounded-md hover:bg-purple-800  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.293 4.293a1 1 0 00-1.414 0L5 9.586V7a1 1 0 00-2 0v4a1 1 0 001 1h4a1 1 0 000-2H6.414l5.293-5.293a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>Back</span>
        </button>

        <h2 className="text-lg font-medium mb-2">
          {selectedChat.name} <span>all members</span>
        </h2>
      </div>

      {user.id == selectedChat.admin && (
        <AddMember/>
      )}

      <div className="list-disc pl-4">
        {members.map((member) => (
          <div key={member.userId} className="mb-2">
            {member.name}
            {member.userId != user.id && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={() => handleRemoveMember(member.userId)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupDetails;

import React, { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { Transition } from "@headlessui/react";
interface props{
  setModal:React.Dispatch<React.SetStateAction<boolean>>
}
function ChatButton({setModal}:props) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  function handleButtonClick() {
    setModal(true);
  }

  return (
    <div className="absolute   bottom-16 right-4">
      <button
        className="bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-full p-3 shadow-lg text-white transition-all duration-300"
        onClick={handleButtonClick}
        onMouseEnter={() => setIsTooltipOpen(true)}
        onMouseLeave={() => setIsTooltipOpen(false)}
      >
        <HiOutlinePlus size={24} />
      </button>

      {/* The tooltip */}
      <Transition
        show={isTooltipOpen}
        enter="transition-all duration-400 ease-out"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all duration-400 ease-out"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-"
      >
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 bg-purple-500 px-2 py-1 text-sm text-white rounded-lg shadow-md">
          Add
        </div>
      </Transition>
    </div>
  );
}

export default ChatButton;

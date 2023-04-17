import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import AddCHatChildren from './AddChatChildren';
interface props{
    modal:boolean;
    setModal:React.Dispatch<React.SetStateAction<boolean>>
}
function AddChat({modal,setModal}:props) {
    return (
        <Transition show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              
              <AddCHatChildren setModal={setModal}/>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
      )
    }

export default AddChat
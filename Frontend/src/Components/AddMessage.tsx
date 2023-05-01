import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StateType, UserType } from "../Types";
import { TailSpin } from "react-loader-spinner";
import InputEmoji from "react-input-emoji";
interface Props {
  addMessage: AddMessageFn;
}
type AddMessageFn = (
  text: string,
  name: string,
  userId?: number
) => Promise<void>;
function AddMessage({ addMessage }: Props) {
  const user = useSelector<StateType>((state) => state.auth.user) as UserType;
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
         try {
          e.preventDefault();
          setLoading(true);
          await addMessage(text, user.name, user.id);
          setText("");
          setLoading(false);
         } catch (error) {
          
         }
        }
  return (
    <div className="bottom-5 bg-purple-100 p-4 w-full rounded-xl">
      <form
        onSubmit={handleSubmit}
        className="flex justify-between items-center p-2"
      >
        <div className="flex-1">
          {/* <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="New message here..."
            className="w-full rounded-full p-2 focus:outline-none"
          /> */}
          <InputEmoji
      value={text}
      onChange={setText}
      cleanOnEnter
      onEnter={handleSubmit}
      placeholder="Type a message"
    />
        </div>
        <div className="flex items-center space-x-2">
          {loading ? (
            <TailSpin
              height="80"
              width="80"
              color="#a855f7"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <button
              type="submit"
              className="bg-purple-600 text-white rounded-full px-4 py-2 hover:bg-purple-800 focus:outline-none"
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddMessage;

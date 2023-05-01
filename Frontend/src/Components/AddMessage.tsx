import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StateType, UserType } from "../Types";
import { TailSpin } from "react-loader-spinner";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

// import "emoji-mart/css/emoji-mart.css";
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
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (text.length > 0) await addMessage(text, user.name, user.id);
      setText("");
      setShowEmojis(false)
      setLoading(false);

    } catch (error) {}
  };
  const addEmoji = (e: any) => {
    setText(text + e.native);
  };

  return (
    <div className="bottom-5 bg-purple-100 p-4 w-full rounded-xl flex flex-col gap-2 justify-between">
      <form
        onSubmit={handleSubmit}
        className="flex justify-between items-center p-2"
      >
        <div className="flex flex-row w-full min-w-[50%] bg-white items-center justify-between rounded-lg">
          <input onFocus={()=>{setShowEmojis(false)}}
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="New message here..."
            className="w-full rounded-full p-2 focus:outline-none"
          />
          <div
          onClick={(e) =>{
            e.stopPropagation();
            setShowEmojis(!showEmojis)
          } }
          className="mx-1  text-black hover:text-purple-800 font-bold text-xl"
        >
          <BsEmojiSmile />
        </div>
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
      {showEmojis && (
          <div className="absolute  right-4 bottom-32 emojiMart">
            <Picker className="h-[40%]" perLine="6" emojiSize="16"emojiVersion='14' previewPosition="none"  data={data} onEmojiSelect={addEmoji} />
          </div>
        )}
    </div>
  );
}

export default AddMessage;

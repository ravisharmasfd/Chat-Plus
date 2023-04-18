import { createSlice } from "@reduxjs/toolkit";
import { ChatType, UserType } from "../Types";


const initialState = {
    chat: null
}

const chatSlice = createSlice({
    name: "selectChat",
    initialState,
    reducers: {
        setChat(state, action) {
            return {
                chat: action.payload,
                }
        },
        setNull(){
            return {    
                chat: null,
                }
        }
    }
        

})
export const {setChat ,setNull} = chatSlice.actions
export default chatSlice.reducer

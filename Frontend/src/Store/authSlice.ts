import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../Types";

const initialState = {
   user : null,
   signIn : false,
}

const userSlice:any = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signOut: () => {
            return {
                signIn: false,
                user: null
                }
        },
        signIn(state, action) {
            return {
                user: action.payload,
                signIn: true
                }
        },
    }
        

})
export const {signOut , signIn} = userSlice.actions
export default userSlice.reducer

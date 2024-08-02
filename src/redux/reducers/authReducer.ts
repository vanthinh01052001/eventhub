import { createSlice } from "@reduxjs/toolkit";
interface AuthState{
    id:string,
    email: string,
    accessToken: string
}
const initialState:AuthState = {
    id: '',
    email: '',
    accessToken: ''
}
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initialState
    },
    reducers: {
        addAuth: (state, action) =>{
            state.authData = action.payload
        },
        removeAuth: (state, action) =>{
            state.authData = initialState
        }
    }
})
export const {addAuth, removeAuth} = authSlice.actions;
export const authReducer = authSlice.reducer

export const authSelector = (state: any)=> state.authReducer.authData
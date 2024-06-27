import { createSlice } from "@reduxjs/toolkit";

interface AuthState { 
 isLoggedIn: boolean,
 isLoading: boolean,
 error: string | null,
}

const initialState: AuthState = {
 isLoggedIn: false,
 isLoading: false,
 error:null,
}

export const authSlice = createSlice({
 name: "auth",
 initialState, 
 reducers: {
  loginRequest(state) {
   state.isLoading = true;
   state.error = null;
  },
  loginSuccess(state) { 
   state.isLoggedIn = true;
   state.isLoading = false;
   state.error = null;
  },
  loginFailed(state) {
   state.error = "Invalid credentials. Please double-check your username and password.";
   state.isLoading = false;
  }
 }
})

export const {
loginRequest,
loginSuccess,
loginFailed
} = authSlice.actions

export default authSlice.reducer
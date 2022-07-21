import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
export interface AuthState {
  user: string,
  jwt: string
}

export const authSliceName = 'auth'

const initialState = {
  user: '',
  jwt: ''
} as AuthState

const authSlice = createSlice({
  name: authSliceName,
  initialState,
  reducers: {
    signin: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user
      state.jwt = action.payload.jwt
    }
  }
})

export const {
  signin
} = authSlice.actions

export const selectAuth = (state: RootState) => state[authSliceName]

export default authSlice.reducer
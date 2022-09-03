import { createSlice, createSelector } from '@reduxjs/toolkit';
import { AUTH, IS_LOGIN, USER_INFO, VALID_TYPE } from '../actionType';
export interface AuthType {
  [IS_LOGIN]: boolean,
  [USER_INFO]: {
    [key: string]: any
  },
  [VALID_TYPE]: number,
}
const initialState: AuthType = {
  [IS_LOGIN]: false,
  [USER_INFO]: {
  },
  [VALID_TYPE]: 0,
}
const { actions, reducer: authReducer } = createSlice({
  name: AUTH,
  initialState,
  reducers: {
    devLogin: (state, action) => {
      state[IS_LOGIN] = true;
      state[USER_INFO] = action.payload;
    },
    setValidType: (state, action) => {
      state[VALID_TYPE] = action.payload;
    },
    loginOut: (state) => {
      state[IS_LOGIN] = false;
      state[USER_INFO] = initialState[USER_INFO];
    }

  },
  extraReducers: {
  }
});
export const validTypeSelector = createSelector((state: { [x: string]: any; }) => state[AUTH][VALID_TYPE], (validType) => validType);
export const loginSlice = createSelector((state: { [x: string]: any; }) => state[AUTH], (value) => value[IS_LOGIN]);
export const { loginOut, devLogin } = actions;
export default authReducer;

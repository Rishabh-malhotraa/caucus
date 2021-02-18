import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateInterface, UserInfoType } from 'types'



export const appData = createSlice({
  name: "appData",
  initialState: {
    guestName: '',
    AdminUser: {} as UserInfoType,
    UserList: [] as UserInfoType[],
    isLoggedIn: false
  },
  reducers: {
    saveGuestName: (state, action: PayloadAction<string>) => {
      state.guestName = action.payload;
    },
    saveisLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    saveAdminUser: (state, action: PayloadAction<UserInfoType>) => {
      state.AdminUser = action.payload;
    },
    saveUserList: (state, action: PayloadAction<UserInfoType[]>) => {
      state.UserList = action.payload;
    },
  },
});



export const selectGuestName = (state: StateInterface) => state.appData.guestName
export const selectAdminUser = (state: StateInterface) => state.appData.AdminUser
export const selectUserList = (state: StateInterface) => state.appData.UserList
export const selectIsLoggedIn = (state: StateInterface) => state.appData.isLoggedIn


export const { saveGuestName, saveisLoggedIn, saveAdminUser, saveUserList } = appData.actions;

export default appData.reducer;

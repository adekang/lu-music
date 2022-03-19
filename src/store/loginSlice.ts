import { getBannerRequest } from "@/services/comment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  userId: number;
  nickname: string;
  avatarUrl: string;
  vipType: number;
}

export interface LoginState {
  userInfo: UserInfo;
  loginStates: boolean;
  loading: boolean;
}

const initialState: LoginState = {
  loginStates: false,
  userInfo: {
    userId: 0,
    nickname: "",
    avatarUrl: "",
    vipType: 0
  },
  loading: false
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    changeLoginStates: (state, action: PayloadAction<boolean>) => {
      state.loginStates = action.payload;
    },
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    changeUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { changeUserInfo, changeLoginStates, changeLoading } = loginSlice.actions;

export default loginSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import { useDispatch } from "react-redux";
import singersReducer from "@/store/singersSlice";
import playerReducer from "@/store/playerSlice";
import searchReducer from "@/store/searchSlice";
import rankReducer from "@/store/rankSlice";
import loginReducer from "@/store/loginSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    singers: singersReducer,
    player: playerReducer,
    search: searchReducer,
    rank: rankReducer,
    login: loginReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

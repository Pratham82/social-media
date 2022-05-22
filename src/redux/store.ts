import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/slice/user.slice";
import postReducer from "./features/post/post.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;

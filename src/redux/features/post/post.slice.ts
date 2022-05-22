import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { STATUS } from "redux/constants";
import { IPostsSliceState } from "types";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (payload: any, thunkApi) => {
    try {
      const {
        data: { data, message },
      } = await axios.post("api/post", payload);
      console.log(data);
      toast.success(message);
      return data;
    } catch (error) {
      toast.error("Invalid email or password");
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, thunkApi) => {
    try {
      const {
        data: { data, message },
      } = await axios.get("api/post");
      toast.success(message);
      return data;
    } catch (error) {
      toast.error("Invalid email or password");
      return thunkApi.rejectWithValue(error);
    }
  },
);

const initialState: IPostsSliceState = {
  posts: [],
  postsCount: 0,
  STATUS: "IDLE",
};

export const postSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state) => {
      state.STATUS = STATUS.PENDING;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.postsCount = action.payload.count;
      state.STATUS = STATUS.FULFILLED;
    });
    builder.addCase(getAllPosts.rejected, (state) => {
      state.STATUS = STATUS.REJECTED;
    });
  },
});

export default postSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setToken } from "utils/tokenHelper";
import { toast } from "react-hot-toast";
import { IUserSliceState } from "types";
import { STATUS } from "../../../constants";

export const verifyToken = createAsyncThunk(
  "user/fetchUser",
  async (payload: any, thunkApi) => {
    try {
      const response = await axios.post("/api/auth/accesstoken", {
        token: payload,
      });
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const login = createAsyncThunk(
  "user/login",
  async (payload: any, thunkApi) => {
    try {
      const {
        data: { data, message },
      } = await axios.post("api/auth/login", payload);
      toast.success(message);
      setToken(data.token);
      return data;
    } catch (error) {
      toast.error("Invalid email or password");
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const register = createAsyncThunk(
  "user/register",
  async (payload: any, thunkApi) => {
    try {
      const user = await axios.post("api/auth/register", payload);
      return user.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk(
  "user/logout",
  async (payload, thunkApi) => {
    try {
      const user = await axios.post("api/auth/logout", {});
      setToken("");
      return user.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload: any, thunkApi) => {
    try {
      const user = await axios.put("api/user", payload);
      return user.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const uploadUserImage = createAsyncThunk(
  "user/uploadUserImage",
  async (payload: any, thunkApi) => {
    try {
      if (!payload) return null;
      const uploadData = new FormData();
      uploadData.append("file", payload);
      uploadData.append(
        "upload_preset",
        process.env.CLOUDINARY_UPLOAD_PRESET as string,
      );
      uploadData.append(
        "cloud_name",
        process.env.CLOUDINARY_CLOUD_NAME as string,
      );
      const { data } = await axios.post(
        process.env.CLOUDINARY_URL as string,
        uploadData,
      );
      return data.secure_url;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

const initialState: IUserSliceState = {
  currentUser: {},
  token: null,
  STATUS: "IDLE",
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.STATUS = STATUS.PENDING;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.STATUS = STATUS.FULFILLED;
    });
    builder.addCase(login.rejected, (state) => {
      state.STATUS = STATUS.REJECTED;
    });
    builder.addCase(verifyToken.pending, (state) => {
      state.STATUS = STATUS.PENDING;
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.STATUS = STATUS.FULFILLED;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(verifyToken.rejected, (state) => {
      state.STATUS = STATUS.REJECTED;
    });
    builder.addCase(logout.pending, (state) => {
      state.STATUS = STATUS.PENDING;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      state.currentUser = {};
      state.STATUS = STATUS.FULFILLED;
    });
    builder.addCase(logout.rejected, (state) => {
      state.STATUS = STATUS.REJECTED;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.STATUS = STATUS.PENDING;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.STATUS = STATUS.FULFILLED;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.STATUS = STATUS.REJECTED;
    });
    builder.addCase(uploadUserImage.pending, (state) => {
      state.STATUS = STATUS.PENDING;
    });
    builder.addCase(uploadUserImage.fulfilled, (state) => {
      state.STATUS = STATUS.FULFILLED;
    });
    builder.addCase(uploadUserImage.rejected, (state) => {
      state.STATUS = STATUS.REJECTED;
    });
  },
});

export default userSlice.reducer;

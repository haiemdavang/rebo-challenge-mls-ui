import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/UserService";
import type { UserDto } from "../types/UserType";

interface UserState {
  profile: UserDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async () => {
    const response = await userService.getProfile();
    return response;
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (data: Partial<UserDto>) => {
    const response = await userService.updateProfile(data);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch profile";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export const { clearProfile } = userSlice.actions;
export default userSlice.reducer;

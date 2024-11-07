import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const fetchUsers = createAsyncThunk('user/fetchUsers', async (username) => {
  const response = await axios.get(`https://api.github.com/search/users?q=${username}`);
  return response.data.items; 
});

export const fetchUserRepos = createAsyncThunk('user/fetchUserRepos', async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}/repos`);
  return { username, repos: response.data };
});

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
});

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],             
    userData: null,       
    repositories: {},     
    loading: false,       
    error: null,           
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Fetch User Repositories
      .addCase(fetchUserRepos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserRepos.fulfilled, (state, action) => {
        const { username, repos } = action.payload;
        state.repositories[username] = repos;
        state.loading = false;
      })
      .addCase(fetchUserRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Fetch User Data
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;  // Storing detailed user data
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;

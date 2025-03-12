// src/redux/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Слайс для работы с пользователем
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
    logout: (state) => {
      state = null;
    }
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

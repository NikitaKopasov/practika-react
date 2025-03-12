// src/redux/boardSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Слайс для работы с досками
const boardSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    setBoards: (state, action) => {
      state.splice(0, state.length, ...action.payload);
    },
    addBoard: (state, action) => {
      state.push(action.payload);
    },
    removeBoard: (state, action) => {
      return state.filter(board => board.id !== action.payload);
    },
    updateBoard: (state, action) => {
      const board = state.find(b => b.id === action.payload.id);
      if (board) {
        board.name = action.payload.name;
      }
    }
  }
});

export const { setBoards, addBoard, removeBoard, updateBoard } = boardSlice.actions;
export default boardSlice.reducer;

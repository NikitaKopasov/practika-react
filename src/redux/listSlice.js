// src/redux/listSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Слайс для работы со списками
const listSlice = createSlice({
  name: 'lists',
  initialState: [],
  reducers: {
    setLists: (state, action) => {
      const { boardId, lists } = action.payload;
      const board = state.find(b => b.id === boardId);
      if (board) {
        board.lists = lists;
      }
    },
    addList: (state, action) => {
      const { boardId } = action.payload;
      const board = state.find(b => b.id === boardId);
      if (board) {
        board.lists.push({ id: Date.now(), name: `Список ${board.lists.length + 1}`, items: [] });
      }
    },
    removeList: (state, action) => {
      const { boardId, listId } = action.payload;
      const board = state.find(b => b.id === boardId);
      if (board) {
        board.lists = board.lists.filter(list => list.id !== listId);
      }
    },
    updateList: (state, action) => {
      const { boardId, listId, name } = action.payload;
      const board = state.find(b => b.id === boardId);
      if (board) {
        const list = board.lists.find(l => l.id === listId);
        if (list) {
          list.name = name;
        }
      }
    }
  }
});

export const { setLists, addList, removeList, updateList } = listSlice.actions;
export default listSlice.reducer;

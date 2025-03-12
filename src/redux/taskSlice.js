// src/redux/taskSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Слайс для работы с задачами
const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    setItem: (state, action) => {
      const { boardId, listId, tasks } = action.payload;
      const board = state.find(b => b.id === boardId);
      if (board) {
        const list = board.lists.find(l => l.id === listId);
        if (list) {
          list.items = tasks;
        }
      }
    },
    addItem: (state, action) => {
      const { boardId, listId, text } = action.payload;
      const board = state.find(b => b.id === boardId);
      if (board) {
        const list = board.lists.find(l => l.id === listId);
        if (list) {
          list.items.push({ id: Date.now(), text, completed: false });
        }
      }
    },
    toggleItem: (state, action) => {
      const { boardId, listId, itemId } = action.payload;
      const board = state.find(b => b.id === boardId);
      if (board) {
        const list = board.lists.find(l => l.id === listId);
        if (list) {
          const item = list.items.find(i => i.id === itemId);
          if (item) {
            item.completed = !item.completed;
          }
        }
      }
    },
    updateItem: (state, action) => {
      const { boardId, listId, itemId, text } = action.payload;
      const board = state.find(b => b.id === boardId);
      if (board) {
        const list = board.lists.find(l => l.id === listId);
        if (list) {
          const item = list.items.find(i => i.id === itemId);
          if (item) {
            item.text = text;
          }
        }
      }
    },
    removeItem: (state, action) => {
      const { boardId, listId, itemId } = action.payload;
      const board = state.find(b => b.id === boardId);
      if (board) {
        const list = board.lists.find(l => l.id === listId);
        if (list) {
          list.items = list.items.filter(i => i.id !== itemId);
        }
      }
    }
  }
});

export const { setItem, addItem, toggleItem, updateItem, removeItem } = taskSlice.actions;
export default taskSlice.reducer;

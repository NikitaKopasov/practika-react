import { configureStore, createSlice } from '@reduxjs/toolkit';

const boardSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    addBoard: (state, action) => {
      state.push({ id: Date.now(), name: action.payload, lists: [] });
    },
    addList: (state, action) => {
      const { boardId } = action.payload;
      const board = state.find(b => b.id === boardId);
      if (board) {
        board.lists.push({ id: Date.now(), name: `Список ${board.lists.length + 1}`, items: [] });
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
    }
  }
});

export const { addBoard, addList, addItem, toggleItem } = boardSlice.actions;

export const store = configureStore({
  reducer: { boards: boardSlice.reducer }
});


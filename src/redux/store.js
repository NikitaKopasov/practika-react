import { configureStore, createSlice } from '@reduxjs/toolkit';

const boardSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    addBoard: (state, action) => {
      state.push({ id: Date.now(), name: action.payload, lists: [] });
    },
    removeBoard: (state, action) => {
      return state.filter(board => board.id !== action.payload);
    },
    updateBoard: (state, action) => {
      const board = state.find(b => b.id === action.payload.id);
      if (board) {
        board.name = action.payload.name;
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

export const { addBoard, removeBoard, updateBoard, addList, removeList, updateList, addItem, toggleItem } = boardSlice.actions;

export const store = configureStore({
  reducer: { boards: boardSlice.reducer }
});

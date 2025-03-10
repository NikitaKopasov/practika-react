import { configureStore, createSlice } from '@reduxjs/toolkit';

const boardSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    // Существующие действия для досок
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
    },

    // Действия для работы со списками
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
    },

    // Действия для работы с задачами
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
    },

    // Для работы с авторизацией и регистрацией
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  }
});

// Экспортируем все действия
export const { 
  setBoards, addBoard, removeBoard, updateBoard, 
  setLists, addList, removeList, updateList, 
  addItem, toggleItem, updateItem, removeItem, setItem,
  setUser, logout 
} = boardSlice.actions;

export const store = configureStore({
  reducer: { boards: boardSlice.reducer }
});

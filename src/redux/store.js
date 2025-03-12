// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice';
import listReducer from './listSlice';
import taskReducer from './taskSlice';
import userReducer from './userSlice';

// Экспортируем действия из каждого слайса
import * as boardActions from './boardSlice';
import * as listActions from './listSlice';
import * as taskActions from './taskSlice';
import * as userActions from './userSlice';

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    lists: listReducer,
    tasks: taskReducer,
    user: userReducer
  }
});

// Экспортируем все действия для использования в компонентах
export const { setBoards, addBoard, removeBoard, updateBoard } = boardActions;
export const { setLists, addList, removeList, updateList } = listActions;
export const { setItem, addItem, toggleItem, updateItem, removeItem } = taskActions;
export const { setUser, logout } = userActions;

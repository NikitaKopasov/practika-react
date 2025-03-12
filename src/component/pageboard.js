import axios from 'axios';

// URL сервера
const API_URL = 'http://localhost:7000';

// Запросы для работы с досками и списками
export const fetchLists = (boardId) => {
  return axios.get(`${API_URL}/list/list`, { params: { boardId } });
};

export const createList = (boardId, name) => {
  return axios.post(`${API_URL}/list/createList`, { boardId, name });
};

export const editList = (boardId, listId, name) => {
  return axios.put(`${API_URL}/list/editList`, { name, listId, boardId });
};

export const deleteList = (boardId, listId) => {
  return axios.delete(`${API_URL}/list/deleteList`, { params: { listId, boardId } });
};

// Запросы для работы с задачами
export const fetchTasks = (boardId, listId) => {
  return axios.get(`${API_URL}/task/task`, { params: { boardId, listId } });
};

export const createTask = (boardId, listId, name) => {
  return axios.post(`${API_URL}/task/createTask`, { name, boardId, listId });
};

export const editTask = (boardId, listId, taskId, name, isActive) => {
  return axios.put(`${API_URL}/task/editTask`, { taskId, listId, boardId, name, isActive });
};

export const deleteTask = (boardId, listId, taskId) => {
  return axios.delete(`${API_URL}/task/deleteTask`, { params: { taskId, listId, boardId } });
};

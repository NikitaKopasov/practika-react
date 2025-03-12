import axios from 'axios';

const API_URL = 'http://localhost:7000/board';

export const fetchBoards = async (token) => {
  const response = await axios.get(`${API_URL}/boards`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createBoard = async (token, name) => {
  const response = await axios.post(`${API_URL}/createBoard`, 
    { name }, 
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const editBoard = async (token, boardId, name) => {
  await axios.put(`${API_URL}/editBoard`, 
    { boardId, name }, 
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const deleteBoard = async (token, boardId) => {
  await axios.delete(`${API_URL}/deleteBoard`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { boardId }
  });
};

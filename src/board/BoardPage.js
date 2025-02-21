import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  setBoards,
  addList,
  removeList,
  updateList,
  addItem
} from '../redux/store';
import './boardpage.css';
import smile from '../assets/images/smile.png';

function BoardPage() {
  const { id } = useParams();
  const boardId = Number(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const board = useSelector(state => state.boards.find(b => b.id === boardId));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/list/list`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setBoards(response.data));
      } catch (err) {
        console.error('Ошибка загрузки доски:', err);
      }
    };
    fetchBoard();
  }, [dispatch, token]);

  const handleAddList = async () => {
    try {
      const response = await axios.post(
        'http://localhost:7000/list/createList',
        { boardId, name: `Список ${board?.lists.length + 1}` },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(addList(response.data));
    } catch (err) {
      console.error('Ошибка при создании списка:', err);
    }
  };

  const OnClickNavigate = () => navigate('/');

  return (
    <div>
      <header className="board-header">
        <img src={smile} alt="Вернуться на главную" className="logo" onClick={OnClickNavigate} />
        <h1>{board?.name || 'Доска не найдена'}</h1>
      </header>

      {board && (
        <div className='board-page'>
          <button className="add-list-button" onClick={handleAddList}>Добавить список</button>
          <div className="lists">
            {board.lists.map(list => (
              <List key={list.id} list={list} boardId={boardId} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function List({ list, boardId }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [listName, setListName] = useState(list.name);

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && task.trim()) {
      try {
        const response = await axios.post(
          'http://localhost:7000/task/createTask',
          { listId: list.id, text: task },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(addItem(response.data));
        setTask('');
      } catch (err) {
        console.error('Ошибка при добавлении задачи:', err);
      }
    }
  };

  const handleUpdateList = async () => {
    try {
      await axios.put(
        'http://localhost:7000/list/editList',
        { listId: list.id, boardId, name: listName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(updateList({ listId: list.id, boardId, name: listName }));
      setIsEditing(false);
    } catch (err) {
      console.error('Ошибка при изменении списка:', err);
    }
  };

  const deleteListButton = async () => {
    try {
      await axios.delete(
        'http://localhost:7000/list/deleteList',
        { data: { listId: list.id, boardId }, headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(removeList({ boardId, listId: list.id }));
    } catch (err) {
      console.error('Ошибка при удалении списка:', err);
    }
  };

  return (
    <div className="list">
      <div className="list-actions">
        <button className="edit-list-button" onClick={() => setIsEditing(true)}>✏️</button>
        <button className="delete-list-button" onClick={deleteListButton}>❌</button>
      </div>
      {isEditing ? (
        <div className="edit-list">
          <input type="text" value={listName} onChange={(e) => setListName(e.target.value)} />
          <button onClick={handleUpdateList}>✔</button>
          <button onClick={() => setIsEditing(false)}>✖</button>
        </div>
      ) : (
        <h3>{list.name}</h3>
      )}
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} onKeyPress={handleKeyPress} placeholder="Добавить задачу..." />
      <ul>
        {list.items.map((item) => (
          <ListItem key={item.id} item={item} listId={list.id} boardId={boardId} />
        ))}
      </ul>
    </div>
  );
}

function ListItem({ item, listId, boardId }) {
  return (
    <li>{item.text}</li>
  );
}

export default BoardPage;

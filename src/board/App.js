import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setBoards, addBoard, removeBoard, updateBoard } from '../redux/store';
import './App.css';
import logo from '../assets/images/smile.png';
import plus from '../assets/images/plus.png';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [editBoardId, setEditBoardId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(state => state.boards);
  const API_URL = 'http://localhost:7000/board';
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const boardsResponse = await axios.get(`${API_URL}/boards`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setBoards(boardsResponse.data));
      } catch (error) {
        console.error('Ошибка при получении досок', error);
      }
    };
    fetchBoards();
  }, [dispatch, token]);

  const handleAddBoard = async () => {
    if (boardName.trim()) {
      try {
        if (editBoardId) {
          await axios.put(`${API_URL}/editBoard`, 
            { boardId: editBoardId, name: boardName }, 
            { headers: { Authorization: `Bearer ${token}` } }
          );
          dispatch(updateBoard({ id: editBoardId, name: boardName }));
          alert('Доска успешно изменена');
          setEditBoardId(null);
        } else {
          const response = await axios.post(`${API_URL}/createBoard`, 
            { name: boardName }, 
            { headers: { Authorization: `Bearer ${token}` } }
          );
          dispatch(addBoard(response.data)); // Добавляем объект с ID от сервера
          alert('Доска успешно создана');
        }
        setBoardName('');
        setIsOpen(false);
        
        // Перезагружаем список досок после добавления новой
        const boardsResponse = await axios.get(`${API_URL}/boards`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setBoards(boardsResponse.data));
      } catch (error) {
        console.error('Ошибка при сохранении доски:', error.response ? error.response.data : error.message);
        alert(`Ошибка: ${error.response ? error.response.data.message : error.message}`);
      }
    }
  };

  const handleEditBoard = (board) => {
    setBoardName(board.name);
    setEditBoardId(board.id);
    setIsOpen(true);
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await axios.delete(`${API_URL}/deleteBoard`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { boardId } // Передаём ID в query-параметрах
      });
      dispatch(removeBoard(boardId));
      alert('Доска успешно удалена');
    } catch (error) {
      console.error('Ошибка при удалении доски:', error.response ? error.response.data : error.message);
      alert(`Ошибка: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const OnClicksetIsOpen = () => setIsOpen(!isOpen);
  const OnChangesetBoardName = e => setBoardName(e.target.value);
  const OnClickFalse = () => { setIsOpen(false); setEditBoardId(null); };
  const OnClickEditBoard = (board) => () => handleEditBoard(board);
  const OnClickDeletBoard = (board) => () => handleDeleteBoard(board.id);
  const OnClickNavigate = (board) => () => navigate(`/board/${board.id}`);

  return (
    <div className="app">
      <header className='app-header'>
        <div className='logo-header'>
          <a href='/'><img src={logo} alt="logo" className='logo'/></a>
        </div>
        <div className='logout'>
          <button className="logout-button" onClick={handleLogout}>Выйти</button>
        </div>
      </header>
      
      <section>
        <button id='new-board' onClick={OnClicksetIsOpen}>
          <img src={plus} className='plus' alt="plus" /> Новая доска
        </button>

        {isOpen && (
          <div className="board-form">
            <h3 className='name-board'>Название доски</h3>
            <input 
              type="text" 
              value={boardName} 
              onChange={OnChangesetBoardName} 
              className='input-name-board' 
              placeholder="Введите название" 
            />
            <div className='form-buttons'>
              <button onClick={handleAddBoard}>{editBoardId ? 'Изменить' : 'Сохранить'}</button>
              <button onClick={OnClickFalse}>Отмена</button>
            </div>
          </div>
        )}
      </section>

      <aside>
        {boards.map(board => (
          <div key={board.boardId || board.id} className="board-container">
            <button className="board" onClick={OnClickNavigate(board)}>
              {board.name}
            </button>
            <button className='editboard' onClick={OnClickEditBoard(board)}>✏️</button>
            <button className='deletboard' onClick={OnClickDeletBoard(board)}>❌</button>
          </div>
        ))}
      </aside>
    </div>
  );
}

export default App;

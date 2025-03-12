import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBoards, addBoard, removeBoard, updateBoard } from '../redux/store';
import { fetchBoards, createBoard, editBoard, deleteBoard } from '../component/boards';
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
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const data = await fetchBoards(token);
        dispatch(setBoards(data));
      } catch (error) {
        console.error('Ошибка при получении досок', error);
      }
    };
    loadBoards();
  }, [dispatch, token]);

  const handleAddBoard = async () => {
    if (boardName.trim()) {
      try {
        if (editBoardId) {
          await editBoard(token, editBoardId, boardName);
          dispatch(updateBoard({ id: editBoardId, name: boardName }));
          alert('Доска успешно изменена');
          setEditBoardId(null);
        } else {
          const newBoard = await createBoard(token, boardName);
          dispatch(addBoard(newBoard));
          alert('Доска успешно создана');
        }
        setBoardName('');
        setIsOpen(false);
        const data = await fetchBoards(token);
        dispatch(setBoards(data));
      } catch (error) {
        console.error('Ошибка при сохранении доски:', error);
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
      await deleteBoard(token, boardId);
      dispatch(removeBoard(boardId));
      alert('Доска успешно удалена');
    } catch (error) {
      console.error('Ошибка при удалении доски:', error);
      alert(`Ошибка: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
        <button id='new-board' onClick={() => setIsOpen(!isOpen)}>
          <img src={plus} className='plus' alt="plus" /> Новая доска
        </button>

        {isOpen && (
          <div className="board-form">
            <h3 className='name-board'>Название доски</h3>
            <input 
              type="text" 
              value={boardName} 
              onChange={(e) => setBoardName(e.target.value)} 
              className='input-name-board' 
              placeholder="Введите название" 
            />
            <div className='form-buttons'>
              <button onClick={handleAddBoard}>{editBoardId ? 'Изменить' : 'Сохранить'}</button>
              <button onClick={() => { setIsOpen(false); setEditBoardId(null); }}>Отмена</button>
            </div>
          </div>
        )}
      </section>

      <aside>
        {boards.map(board => (
          <div key={board.boardId || board.id} className="board-container">
            <button className="board" onClick={() => navigate(`/board/${board.id}`)}>
              {board.name}
            </button>
            <button className='editboard' onClick={() => handleEditBoard(board)}>✏️</button>
            <button className='deletboard' onClick={() => handleDeleteBoard(board.id)}>❌</button>
          </div>
        ))}
      </aside>
    </div>
  );
}

export default App;

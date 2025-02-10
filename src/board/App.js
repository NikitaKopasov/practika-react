import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBoard, removeBoard, updateBoard } from '../redux/store';
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

  const handleAddBoard = () => {
    if (boardName.trim()) {
      if (editBoardId) {
        dispatch(updateBoard({ id: editBoardId, name: boardName }));
        setEditBoardId(null);
      } else {
        dispatch(addBoard(boardName));
      }
      setBoardName('');
      setIsOpen(false);
    }
  };

  const handleEditBoard = (board) => {
    setBoardName(board.name);
    setEditBoardId(board.id);
    setIsOpen(true);
  };

  const OnClicksetIsOpen = () => setIsOpen(!isOpen);
  const OnChangesetBoardName = e => setBoardName(e.target.value);
  const OnClickFalse = () => { setIsOpen(false); setEditBoardId(null); }
  const OnClickEditBoard = (board) => () => handleEditBoard(board);
  const OnClickDeletBoard = (board) => () => dispatch(removeBoard(board.id));
  const OnClickNavigate = (board) => () => navigate(`/board/${board.id}`);

  return (
    <div className="app">
      <header className='app-header'>
        <a href='/'><img src={logo} alt="logo" className='logo'/></a>
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
          <div key={board.id} className="board-container">
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

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBoard } from './store';
import './App.css'
import logo from './assets/images/smile.png';
import plus from './assets/images/plus.png';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [boardName, setBoardName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(state => state.boards);

  const handleAddBoard = () => {
    if (boardName.trim()) {
      dispatch(addBoard(boardName));
      setBoardName('');
      setIsOpen(false);
    }
  };

  return (
    <div className="app">
      <header className='app-header'>
        <a href='/'><img src={logo} alt="logo" className='logo'/></a>
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
              onChange={e => setBoardName(e.target.value)}
              className='input-name-board' 
              placeholder="Введите название" 
            />
            <div className='form-buttons'>
            <button onClick={handleAddBoard}>Сохранить</button>
            <button onClick={() => setIsOpen(false)}>Отмена</button>
            </div>
          </div>
        )}
      </section>

      <aside>
        {boards.map(board => (
          <button 
            key={board.id} 
            className="board" 
            onClick={() => navigate(`/board/${board.id}`)}
          >
            {board.name}
          </button>
        ))}
      </aside>
    </div>
  );
}

export default App;

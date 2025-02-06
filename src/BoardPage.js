import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addList, addItem, toggleItem } from './store';
import { useState } from 'react';
import './boardpage.css';
import smile from './assets/images/smile.png'; // Оставляем смайлик

function BoardPage() {
  const { id } = useParams();
  const boardId = Number(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const board = useSelector(state => state.boards.find(b => b.id === boardId));

  const handleAddList = () => {
    dispatch(addList({ boardId }));
  };

  return (
    <div>
      <header className="board-header">
        <img 
          src={smile} 
          alt="Вернуться на главную" 
          className="logo" 
          onClick={() => navigate('/')}
        />
        <h1>{board?.name || 'Доска не найдена'}</h1>
      </header>
      <div className="board-page">
      {board && (
        <>
          <button onClick={handleAddList}>Добавить список</button>

          <div className="lists">
            {board.lists.map(list => (
              <List key={list.id} list={list} boardId={boardId} />
            ))}
          </div>
        </>
      )}
      </div>
    </div>
  );
}

function List({ list, boardId }) {
  const dispatch = useDispatch();
  const [task, setTask] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && task.trim()) {
      dispatch(addItem({ boardId, listId: list.id, text: task }));
      setTask('');
    }
  };

  return (
    <div className="list">
      <h3>{list.name}</h3>
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        onKeyPress={handleKeyPress} 
        placeholder="Добавить элемент..."
      />
      <ul>
        {list.items.map(item => (
          <li key={item.id} style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => dispatch(toggleItem({ boardId, listId: list.id, itemId: item.id }))}
            />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoardPage; // Экспортируем по умолчанию

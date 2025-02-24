import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addList, addItem, toggleItem, removeList, updateList, removeItem, updateItem } from '../redux/store';

import { useState } from 'react';
import './boardpage.css';
import smile from '../assets/images/smile.png';

function BoardPage() {
  const { id } = useParams();
  const boardId = Number(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const board = useSelector(state => state.boards.find(b => b.id === boardId));

  const handleAddList = () => {
    dispatch(addList({ boardId }));
  };
  const OnClickNavigate = () => navigate('/')

  return (
    <div>
      <header className="board-header">
        <img 
          src={smile} 
          alt="Вернуться на главную" 
          className="logo" 
          onClick={OnClickNavigate}
        />
        <h1>{board?.name || 'Доска не найдена'}</h1>
      </header>

      {board && (
        <div className='board-page'>
          <button className="add-list-button" onClick={handleAddList}>
            Добавить список
          </button>

          <div className="lists">
            {board.lists.map(list => (
              <List key={list.id} list={list} boardId={boardId} dispatch={dispatch} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function List({ list, boardId, dispatch }) {
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [listName, setListName] = useState(list.name);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && task.trim()) {
      dispatch(addItem({ boardId, listId: list.id, text: task }));
      setTask('');
    }
  };

  const handleUpdateList = () => {
    dispatch(updateList({ boardId, listId: list.id, name: listName }));
    setIsEditing(false);
  };

  const editListButton = () => setIsEditing(true);
  const deleteListButton = () => dispatch(removeList({ boardId, listId: list.id }));
  const onChangesetListName = (e) => setListName(e.target.value);
  const onKeyPresshandleUpdateList = (e) => e.key === 'Enter' && handleUpdateList();
  const onClicksetIsEditing = () => setIsEditing(false);
  const onChangesetTask = (e) => setTask(e.target.value);


  return (
    <div className="list">
      <div className="list-actions">
        <button className="edit-list-button" onClick={editListButton}>✏️</button>
        <button className="delete-list-button" onClick={deleteListButton}>❌</button>
      </div>

      {isEditing ? (
        <div className="edit-list">
          <input
            type="text"
            value={listName}
            onChange={onChangesetListName}
            onKeyPress={onKeyPresshandleUpdateList}
          />
          <button onClick={handleUpdateList}>✔</button>
          <button onClick={onClicksetIsEditing}>✖</button>
        </div>
      ) : (
        <h3>{list.name}</h3>
      )}

      <input
        type="text"
        value={task}
        onChange={onChangesetTask}
        onKeyPress={handleKeyPress}
        placeholder="Добавить элемент..."
      />

      <ul>
        {list.items.map((item) => (
          <ListItem key={item.id} item={item} listId={list.id} boardId={boardId} dispatch={dispatch} />
        ))}
      </ul>
    </div>
  );
}

function ListItem({ item, listId, boardId, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);

  const handleUpdateItem = () => {
    if (text.trim()) {
      dispatch(updateItem({ boardId, listId, itemId: item.id, text }));
      setIsEditing(false);
    }
  };

  const toggleItemOnChange = () => dispatch(toggleItem({ boardId, listId, itemId: item.id }));
  const textOnChange = (e) => setText(e.target.value);
  const textOnKeyPress = (e) => e.key === 'Enter' && handleUpdateItem();
  const spanonDoubleClick = () => setIsEditing(true);
  const onClicksetIsEditing = () => setIsEditing(true);
  const onClickremoveItem = () => dispatch(removeItem({ boardId, listId, itemId: item.id }))
  return (
    <li className={item.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={toggleItemOnChange}
      />
      
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={textOnChange}
          onKeyPress={textOnKeyPress}
        />
      ) : (
        <span onDoubleClick={spanonDoubleClick}>{item.text}</span>
      )}

      {isEditing ? (
        <button onClick={handleUpdateItem}>✔</button>
      ) : (
        <button onClick={onClicksetIsEditing}>✏️</button>
      )}

      <button onClick={onClickremoveItem}>❌</button>
    </li>
  );
}


export default BoardPage;

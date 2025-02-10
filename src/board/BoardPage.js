import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addList, addItem, toggleItem, removeList, updateList } from '../redux/store';

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
    <div >
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
        <>
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
        </>
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
  const editListButton = () => setIsEditing(true)
  const deleteListButton = () => dispatch(removeList({ boardId, listId: list.id }))
  const onChangesetListName = (e) => setListName(e.target.value)
  const onKeyPresshandleUpdateList = (e) => e.key === 'Enter' && handleUpdateList()
  const onClicksetIsEditing = () => setIsEditing(false)
  const onChangesetTask = (e) => setTask(e.target.value)
  const onChangedispatch = (item) => () => dispatch(toggleItem({ boardId, listId: list.id, itemId: item.id }));

  return (
    <div className="list">
      <div className="list-actions">
        <button className="edit-list-button" onClick={editListButton}>✏️</button>
        <button className="delete-list-button" onClick={deleteListButton}>
          ❌
        </button>
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
          <li key={item.id} className={item.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={onChangedispatch(item)}
            />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}




export default BoardPage;

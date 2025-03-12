import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLists, addList, removeList, updateList, setItem, addItem, toggleItem, updateItem, removeItem } from '../redux/store';
import { fetchLists, createList, deleteList, editList, fetchTasks, createTask, editTask, deleteTask } from '../component/pageboard';
import './boardpage.css';
import smile from '../assets/images/smile.png';

function BoardPage() {
  const { id } = useParams();
  const boardId = id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lists = useSelector(state => state.boards.find(board => board.id === Number(boardId))?.lists || []);

  useEffect(() => {
    fetchLists(boardId)
      .then(response => {
        dispatch(setLists({ boardId, lists: response.data }));
      })
      .catch(error => console.error('Ошибка загрузки списков:', error));
  }, [boardId, dispatch]);

  const handleAddList = async () => {
    try {
      const response = await createList(boardId, `Список ${lists.length + 1}`);
      dispatch(addList({ boardId, list: response.data }));
    } catch (error) {
      console.error('Ошибка создания списка:', error);
    }
  };

  const OnClickNavigate = () => navigate('/');

  return (
    <div>
      <header className="board-header">
        <img src={smile} alt="Вернуться на главную" className="logo" onClick={OnClickNavigate} />
        <h1>Доска {boardId}</h1>
      </header>

      <div className="board-page">
        <button className="add-list-button" onClick={handleAddList}>
          Добавить список
        </button>

        <div className="lists">
          {lists.map(list => (
            <List key={list.id} list={list} boardId={boardId} />
          ))}
        </div>
      </div>
    </div>
  );
}

function List({ list, boardId }) {
  const dispatch = useDispatch();
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [listName, setListName] = useState(list.name);
  const [tasks, setTasks] = useState(list.items || []);

  useEffect(() => {
    fetchTasks(boardId, list.id)
      .then(response => {
        setTasks(response.data);
        dispatch(setItem({ boardId, listId: list.id, tasks: response.data }));
      })
      .catch(error => console.error('Ошибка загрузки задач:', error));
  }, [boardId, list.id, dispatch]);

  const handleUpdateList = async () => {
    try {
      await editList(boardId, list.id, listName);
      dispatch(updateList({ boardId, listId: list.id, name: listName }));
      setIsEditing(false);
    } catch (error) {
      console.error('Ошибка обновления списка:', error);
    }
  };

  const deleteListButton = async () => {
    try {
      await deleteList(boardId, list.id);
      dispatch(removeList({ boardId, listId: list.id }));
    } catch (error) {
      console.error('Ошибка удаления списка:', error);
    }
  };

  const handleAddTask = async (e) => {
    if (e.key === 'Enter' && task.trim()) {
      try {
        await createTask(boardId, list.id, task); // Просто вызываем функцию без сохранения ответа
        dispatch(addItem({ boardId, listId: list.id, text: task }));
        setTask('');
      } catch (error) {
        console.error('Ошибка добавления задачи:', error);
      }
    }
  };
  

  const onchangeSetListName = e => setListName(e.target.value);
  const onchangeSetTask = e => setTask(e.target.value);

  const onClickEditList = () => setIsEditing(true);
  const onClickDeleteList = deleteListButton;
  const onClickCancelEditList = () => setIsEditing(false);

  return (
    <div className="list">
      <div className="list-actions">
        <button className="edit-list-button" onClick={onClickEditList}>✏️</button>
        <button className="delete-list-button" onClick={onClickDeleteList}>❌</button>
      </div>

      {isEditing ? (
        <div className="edit-list">
          <input type="text" value={listName} onChange={onchangeSetListName} onKeyPress={e => e.key === 'Enter' && handleUpdateList()} />
          <button onClick={handleUpdateList}>✔</button>
          <button onClick={onClickCancelEditList}>✖</button>
        </div>
      ) : (
        <h3>{list.name}</h3>
      )}

      <input type="text" value={task} onChange={onchangeSetTask} onKeyPress={handleAddTask} placeholder="Добавить элемент..." />
      <ul>
        {tasks.map((item) => (
          <ListItem key={item.id} item={item} listId={list.id} boardId={boardId} />
        ))}
      </ul>
    </div>
  );
}

function ListItem({ item, listId, boardId }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.name);

  const handleToggleActive = async () => {
    try {
      const updatedItem = { ...item, isActive: !item.isActive };
      await editTask(boardId, listId, item.id, item.name, updatedItem.isActive);
      dispatch(toggleItem({ boardId, listId, itemId: item.id }));
    } catch (error) {
      console.error('Ошибка изменения статуса задачи:', error);
    }
  };

  const handleUpdateItem = async () => {
    try {
      await editTask(boardId, listId, item.id, text, item.isActive);
      dispatch(updateItem({ boardId, listId, itemId: item.id, text }));
      setIsEditing(false);
    } catch (error) {
      console.error('Ошибка обновления задачи:', error);
    }
  };

  const onClickRemoveItem = async () => {
    try {
      await deleteTask(boardId, listId, item.id);
      dispatch(removeItem({ boardId, listId, itemId: item.id }));
    } catch (error) {
      console.error('Ошибка удаления задачи:', error);
    }
  };

  const onchangeSetText = e => setText(e.target.value);
  const onClickEditItem = () => setIsEditing(true);

  return (
    <li className={item.isActive ? 'active' : 'inactive'}>
      {isEditing ? (
        <input type="text" value={text} onChange={onchangeSetText} onKeyPress={e => e.key === 'Enter' && handleUpdateItem()} />
      ) : (
        <span onDoubleClick={onClickEditItem}>{text}</span>
      )}

      <button onClick={handleUpdateItem}>✔</button>
      <button onClick={onClickEditItem}>✏️</button>
      <button onClick={onClickRemoveItem}>❌</button>
      <button onClick={handleToggleActive}>
        {item.isActive ? 'Сделать неактивным' : 'Сделать активным'}
      </button>
    </li>
  );
}

export default BoardPage;

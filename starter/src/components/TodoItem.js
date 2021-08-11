import React from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteTodo,
  deleteTodoAsync,
  toggleComplete,
  toggleCompleteAsync,
} from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  const handleCheckboxClick = () => {
    // dispatch(toggleComplete({ id: id, completed: !completed }));
    console.log(
      'object :>> ',
      JSON.stringify({ id: id, completed: !completed })
    );
    dispatch(toggleCompleteAsync({ id: id, completed: !completed }));
  };

  const handleDelete = () => {
    // dispatch(deleteTodo({ id }));
    dispatch(deleteTodoAsync({ id }));
  };

  return (
    <li className={`list-group-item ${completed && 'list-group-item-success'}`}>
      <div className="d-flex justify-content-between">
        <label
          htmlFor={id}
          className="d-flex align-items-center"
          style={{ flex: 1, marginBottom: 0 }}
        >
          <span>
            <input
              id={id}
              type="checkbox"
              className="mr-3"
              checked={completed}
              onChange={handleCheckboxClick}
            ></input>
            {title}
          </span>
        </label>
        <button className="btn btn-danger" type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

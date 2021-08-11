import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk(
  'todos/getTodoAsync',
  async () => {
    const response = await fetch('http://localhost:7000/todos');
    if (response.ok) {
      const todos = await response.json();
      console.log('async todos', todos);
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (payload) => {
    const response = await fetch('http://localhost:7000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: payload.title }),
    });

    if (response.ok) {
      const todo = await response.json();
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  'todos/toggleCompleteAsync',
  async (payload) => {
    console.log('payload :>> ', payload);
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: payload.completed }),
    });

    if (response.ok) {
      const todo = await response.json();
      console.log('todo :>> ', todo);
      return { id: todo.id, completed: todo.completed };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return { id: payload.id };
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: [
    { id: 1, title: 'todo1', completed: false },
    { id: 2, title: 'todo2', completed: false },
    { id: 3, title: 'todo3', completed: true },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const idx = state.findIndex((todo) => todo.id === action.payload.id);
      state[idx].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      const idx = state.findIndex((todo) => todo.id === action.payload.id);
      state.splice(idx, 1);
      // state.filter(todo => todo.id !=== action.payload.id);
    },
  },
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      console.log('fetching data...');
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      console.log('fetched data successfully!');
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const idx = state.findIndex((todo) => {
        return todo.id === action.payload.id;
      });
      state[idx].completed = action.payload.completed;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      const idx = state.findIndex((todo) => todo.id === action.payload.id);
      state.splice(idx, 1);
      // state.filter(todo => todo.id !=== action.payload.id);
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;

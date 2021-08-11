import { createSlice } from '@reduxjs/toolkit';

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
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;

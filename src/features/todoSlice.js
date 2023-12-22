import { createSlice } from "@reduxjs/toolkit"

function todosFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos')) || [
        {
            id: 4,
            title: 'Playing Hockey',
            completed: true,
        },
    ]
}

const initialState = {
    todos: [],
}

const state = {
    todos: todosFromLocalStorage(),
    completed: 0,
    uncompleted: 0,
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState: state,
    reducers: {
        addTodo: (state, { payload }) => {
            console.log(state.todos)
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        removeTodo: (state, { payload }) => {
            state.todos = state.todos.filter((todo) => todo.id !== payload)
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        toggleComplete: (state, { payload }) => {
            const todo = state.todos.find((todo) => todo.id === payload)
            todo.completed = !todo.completed
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        statistic: (state) => {
            let completedCounter = 0
            let uncompletedCounter = 0

            state.todos.forEach((todo) => {
                if (todo.completed) completedCounter += 1
                else uncompletedCounter += 1
            })

            state.completed = completedCounter
            state.uncompleted = uncompletedCounter
        },
    }
})

export const { addTodo, removeTodo, toggleComplete, statistic } = todoSlice.actions
export default todoSlice.reducer
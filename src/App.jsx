import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addTodo, removeTodo, toggleComplete, statistic } from "./features/todoSlice"
import {v4 as uuidv4} from 'uuid'

function App() {
  const { todos, completed, uncompleted } = useSelector((store) => store.todo)

  const title = useRef()
  const completedRef = useRef()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const newTodo = {
      id: uuidv4(),
      title: title.current.value,
      completed: completedRef.current.checkedm
    }

    dispatch(addTodo(newTodo))
  }

  useEffect(() => {
    dispatch(statistic())
  }, [todos, dispatch])


  return (
    <div className="w-full min-h-screen form-control flex items-center justify-center">
      <h1 className="text-5xl font-bold mb-7">Todo List With Redux</h1>
      <form onSubmit={handleSubmit} className="form-control w-full gap-5 max-w-[770px]">
        <div className="flex items-center gap-2 w-full">
          <input ref={title} type="text" className="input input-md w-full input-bordered rounded-md" />
          <button className='btn btn-primary rounded-md btn-md'>Create</button>
          <input ref={completedRef} type="checkbox" checked='false' className="checkbox" />
        </div>
        <div className="flex flex-col justify-center w-full px-3 py-4 rounded-md bg-slate-600">
          <ul className="form-control gap-y-4">
            {todos.map((todo) => {
              return <li className="w-full flex justify-between items-center" key={todo.id}>
                <div className="flex items-center gap-3">
                  <p className="text-md">{todo.completed ? '✅' : '❌'}</p>
                  <h3 className="text-2xl font-bold">{todo.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => dispatch(toggleComplete(todo.id))} className="btn btn-sm btn-accent font-bold">
                    {todo.completed ? 'Uncomplete' : 'Complete'}
                  </button>
                  <button onClick={() => dispatch(removeTodo(todo.id))} className="btn btn-sm btn-warning font-bold">Delete</button>
                </div>
              </li>
            })}
          </ul>
        </div>

        <div className="flex items-center justify-between text-xl">
          <h2>Completed: {completed}</h2>
          <h2>Uncompleted: {uncompleted}</h2>
        </div>
      </form>
    </div>
  )
}

export default App
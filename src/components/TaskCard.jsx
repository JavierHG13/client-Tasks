import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


function TaskCard({task}) {

    const {deleteTask}=useTasks()

  return (
    <div 
    className="bg-zinc-800 tasks text-white p-6 rounded-md shadow-md hover:shadow-xl transition transform hover:scale-105"
  >
    <header className="flex justify-between">
    <h2 className="text-xl mb-2">{task.title}</h2>
  
    </header>
    <p className="text-gray-400">{task.description}</p>
    <p className="text-gray-400">
      {dayjs(task.date).utc().format("DD/MM/YYYY")}
    </p>
    <div className="flex gap-x-2 items-center">
      <button onClick={()=>{
        deleteTask(task._id)
      }} 
      className="bg-red-500 px-2  py-2 rounded-md transition transform hover:bg-red-800 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-500 mr-2">
        Eliminar
      </button>
      <button className="bg-blue-600 px-2  py-2 rounded-md transition transform hover:bg-blue-800 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-500">
        <Link to={`/tasks/${task._id}`}>Editar</Link>
      </button>
    </div>
  </div>
  )
}

export default TaskCard
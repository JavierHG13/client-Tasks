import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if(tasks.length==0) 
    return (
  <div>
      <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl h1-form text-gray-300 mb-8">Lista de Tareas</h1>
      <h2 className="tasks text-red-400">No hay tareas</h2>
    </div>
  </div>
  )

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl h1-form text-gray-300 mb-8">Lista de Tareas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id}/>
        ))}
      </div>
    </div>
  );
}

export default TasksPage;

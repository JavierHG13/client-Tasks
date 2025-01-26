import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import {useNavigate, useParams} from 'react-router-dom'
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function TasksFormPage() {
  const{register,handleSubmit,setValue}=useForm()
  const {createTask,getTask,updateTask}=useTasks()
  const navigate= useNavigate()
  const params= useParams()

  useEffect(()=>{
      async function loadTask(){
      if(params.id){
        const task=await getTask(params.id)
         console.log(task);
        setValue('title',task.title)
        setValue('description',task.description) 
        setValue('date', dayjs(task.date).utc().format("YYYY-MM-DD"))
      }
    }
    loadTask()
  },[])


  const onSubmit=handleSubmit((data)=>{
    const dataValid={
     ...data,
     date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    }

    
  console.log("Datos enviados al servidor:", dataValid);
    if(params.id){
      updateTask(params.id,dataValid)
    }else{
      createTask(dataValid)
    }
    navigate('/tasks')
  })

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md shadow-lg">
        <h2 className="text-2xl text-gray-300 h1-form mb-6 text-center">
          Crear Tarea
        </h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Título"
            className="w-full bg-zinc-700 tasks text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            {...register("title")}
            autoFocus
          />
          <textarea
            rows="3"
            placeholder="Descripción"
            className="w-full bg-zinc-700 tasks text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            {...register("description")}
          ></textarea>
           <input
            type="date"
            placeholder="Fecha"
            className="w-full bg-zinc-700 tasks text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            {...register("date")}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 tasks text-white px-4 py-2 rounded-md transition transform hover:bg-blue-800 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-500"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default TasksFormPage;

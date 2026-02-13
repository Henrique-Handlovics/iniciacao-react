import AddTasks from "./componets/AddTasks"
import Tasks from "./componets/Tesks"
import { useEffect, useState } from 'react'


function App(){
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  useEffect(() => {
   async function fetchTasks(){
     //CHAMAR A API
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10", 
      {
      method: "GET",
      }
  );
   
    // PEGAR OS DADOS QUE ELA RETORNA
     const data = await response.json();
    
    // ARMAZENAR OS DADOS NO ESTADO
      setTasks(data);
   }
   //pode chamar uma API para pegar as tarefas
  //  fetchTasks();
  }, [])

  //Função para lidar com o clique em uma tarefa 

  function onTaskClick(taskId){
    const newTasks = tasks.map(task => {
      // Atualiza a tarefa clicada, marcando-a como concluída
      if(task.id === taskId){
        return {...task, isCompleted: !task.isCompleted}
      }

      // Retorna as outras tarefas sem alterações
      return task;
    })
    setTasks(newTasks);
  }

    //Função para lidar com a exclusão de uma tarefa

  function onTaskDelete(taskId){
    const delTasks = tasks.filter(task => {
      // Exclui a tarefa clicada, removendo-a da lista
      if(task.id === taskId){
        return null; // Retorna null para indicar que a tarefa deve ser removida
      } 

      return task; // Retorna as outras tarefas sem alterações
   })
   setTasks(delTasks.filter(task => task !== null)); // Atualiza a lista de tarefas, removendo as tarefas nulas
  }

  //Função para adicionar uma nova tarefa

  function onAddTaskSubmit(title, description){ 
    const newTask = {
      id: tasks.length + 1, // Gera um ID único para a nova tarefa
      title: title,
      description: description,
      isCompleted: false
    }
    setTasks([...tasks, newTask]); // Adiciona a nova tarefa à lista de tarefas
  }

  return(
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-500px space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">Gerenciador de Tarefas</h1>
        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onTaskDelete={onTaskDelete}/>
      </div>
    </div>
  )
}

export default App   
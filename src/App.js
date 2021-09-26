import React from 'react'
import { useState } from 'react'
import AddTask from './components/AddTask'
import Task from './components/Task'
import TaskBody from './components/TaskBody'
import SubTasks from './components/SubTasks'
import './App.scss'
import './App.css'

function App() {

  
  // Tasks functions
  const [showForm, setShowForm] = useState(false)
  const showTaskForm = () => {
    setShowForm(!showForm);
  }

  let LSTasks = JSON.parse(localStorage.getItem("tasks"))
  if (LSTasks === null) {
    LSTasks = [{
      id: 0,
      text: "Click on the arrow for task info",
      body: "Task information is displayed here",
      subTasks: ["Subtasks are displayed here", "Each task can have up to 3 subtasks", "All tasks are stored in local storage"]
    }]
  }
  const [tasks, setTasks] = useState(LSTasks)

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = {id, ...task};
    setTasks([...tasks, newTask]);
    storeTasks(newTask);
    setShowForm(false);
  }

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
    removeTasks(newTasks)
    setCurrentTask({})
    setCurrentTaskId(-1)
    if(showBody){
      setShowBody(false)
    }
  }

  const storeTasks = (task) => {
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
  }

  const removeTasks = (newTasks) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  
  const [showBody, setShowBody] = useState(false)
  const [currentTaskId, setCurrentTaskId] = useState(-1)
  const [currentTask, setCurrentTask] = useState({})

  const showInfo = (task) => {
    
    setCurrentTaskId(task.id)
    if (currentTaskId === task.id || !showBody) {
      setShowBody(!showBody)
    }
    setCurrentTask(task)
  }

  return (
    <div className="App">
      <header>
      <h1> Task Tracker </h1>
      <button className="showAddTask" onClick={showTaskForm}>Add Task</button><br/>
      {showForm ? <AddTask onAdd={addTask} showTaskForm={showTaskForm}/> : <></>}
      </header>
      <div className="task-container">
        <div className="task-column">
          <h3>Primary</h3><br/>
          { tasks.length > 0 ? 
            <></>
            :
            <p>Nothing to show!</p>
          }
          {tasks.map((task) => (
              <div>
                <Task task={task} onDelete={deleteTask} showInfo={showInfo} showBody={showBody} currentTaskId={currentTaskId}/>
              </div>
            ))}
        </div>
        <div className="task-column">
          <h3>Sub Tasks</h3><br/>
          {showBody ? <SubTasks task={currentTask} />
          : 
          <p>Nothing to show!</p>}
        </div>
        <div className="task-column">
          <h3>Info</h3><br/>
          {showBody ? <TaskBody task={currentTask}/>
          : 
          <p>Nothing to show!</p>}
        </div>
        
      </div>
    </div>
  );
}

export default App;

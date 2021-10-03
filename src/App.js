import React from 'react'
import { useState } from 'react'
import AddTask from './components/AddTask'
import Task from './components/Task'
import TaskBody from './components/TaskBody'
import SubTasks from './components/SubTasks'
import './App.scss'
import './App.css'

function App() {
  
  // TASK FUNCTIONS

  // State to show or hide form
  const [showForm, setShowForm] = useState(false)
  const showTaskForm = () => {
    setShowForm(!showForm);
  }

  // Get data from local storage | Set default value if LS is empty
  let LSTasks = JSON.parse(localStorage.getItem("tasks"))
  if (LSTasks === null) {
    LSTasks = [{
      id: 0,
      text: "Click on the arrow for task info",
      body: "Task information is displayed here",
      subTasks: [{text:"Each task can have multiple subtasks" , done: false}, {text: "Subtasks can be marked as done", done: false}, {text: "All data is stored in local storage", done: false}]
    }]
  }

  // State for current tasks array
  const [tasks, setTasks] = useState(LSTasks)

  // Add a new task to state and local storage
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = {id, ...task};
    setTasks([...tasks, newTask]);
    storeNewTask(newTask);
    setShowForm(false);
  }

  // Delete a task from state and local storage
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
    updateTasks(newTasks)
    setCurrentTask({})
    setCurrentTaskId(-1)
    if(showBody){
      setShowBody(false)
    }
  }

  // Store tasks in state to LocalStorage
  const storeNewTask = (task) => {
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
  }

  // Store tasks in LS after deleting a task
  const updateTasks = (newTasks) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  // States to show/hide subtasks and info 
  const [showBody, setShowBody] = useState(false)
  const [currentTaskId, setCurrentTaskId] = useState(-1)
  const [currentTask, setCurrentTask] = useState({})
  const [bodyText, setBodyText] = useState("Nothing to show!")

  //yucky timeout function to force a re-render on subtasks
  const switchSubTasks = () => {
    setTimeout(() => {
      setShowBody(true)
      setBodyText("Nothing to show!")
    }, 50)
  }

  // Change view state of subtasks and info
  const showInfo = (task) => {
    if (currentTaskId === -1) {
      setCurrentTaskId(task.id)
      setShowBody(true)
    }
    if (currentTaskId !== task.id) {
      setCurrentTaskId(task.id)
      setBodyText("")
      setShowBody(false)
      switchSubTasks()
    }
    if (currentTaskId === task.id || !showBody) {
      setShowBody(!showBody)
    }
    setCurrentTask(task)
  }

  // Mark a subtask as done and update to state/LS
  const markDone = (e, subTask) => {

    // Change styling to have strike-through
    let subTaskDone = e.target
    
    if (subTaskDone.nodeName === "svg") {
      subTaskDone = e.target.parentNode.previousSibling
    } else if (subTaskDone.nodeName === "path") {
      subTaskDone = e.target.parentNode.parentNode.previousSibling
    }
    if (subTaskDone.style.textDecorationLine !== "line-through") {
      subTaskDone.style.textDecorationLine = "line-through"
      subTask.done = true
    } else {
      subTaskDone.style.textDecorationLine = "none"
      subTask.done = false
    }

    // Update done state in tasks state variable | Write to LS
    tasks.forEach((task) => {
      if (task.id === currentTaskId) {
        task.subTasks.forEach((sub) => {
          if (sub.text === subTask.text) {
            sub.done = subTask.done
          }
        })
      }
    })
    setTasks(tasks)
    updateTasks(tasks)
  }

  // Add subtask to current task
  const addSubTask = (subTask) => {
    tasks.forEach((task) => {
      if (task.id === currentTaskId) {
        task.subTasks.push(subTask)
      }
    })
    setTasks(tasks)
    updateTasks(tasks)
  }

  // Delete subtask 
  const delSubTask = (subTask) => {
    tasks.forEach((task) => {
      if (task.id === currentTaskId) {
        let subIndex = -1
        task.subTasks.forEach ((sub, index) => {
          if (sub.text === subTask.text) {
            subIndex = index
          }
        })
        task.subTasks.splice(subIndex, 1)
        console.log(task.subTasks)
      }
    })
    setTasks(tasks)
    updateTasks(tasks)
    setBodyText("")
    setShowBody(false)
    switchSubTasks()
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
          { tasks.length > 0 ? <></> :<p>Nothing to show!</p> }
          {tasks.map((task) => (
              <div>
                <Task task={task} onDelete={deleteTask} showInfo={showInfo} showBody={showBody} currentTaskId={currentTaskId}/>
              </div>
            ))}
        </div>
        <div className="task-column">
          <h3>Sub Tasks</h3><br/>
          {showBody ? <SubTasks task={currentTask} markDone = {markDone} addSubTask={addSubTask} delSubTask = {delSubTask} />
          : 
          <p>{bodyText}</p>}
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

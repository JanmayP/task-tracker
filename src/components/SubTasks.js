import { FaTimes } from 'react-icons/fa'

const SubTasks = ({task}) => {
  let cleanSubTasks = task.subTasks.filter((subTask) => subTask !== "")

  const markDone = (e) => {
    let subTaskDone = e.target.previousSibling
    if (subTaskDone === null) {
      subTaskDone = e.target.parentNode.previousSibling
    }
    if (subTaskDone.style.textDecorationLine !== "line-through") {
      subTaskDone.style.textDecorationLine = "line-through"
    } else {
      subTaskDone.style.textDecorationLine = "none"
    }
  }
  
  return (
    <div className="task-subtasks">
      {cleanSubTasks.length > 0 
      ? cleanSubTasks.map((subTask) => (
        <div className="task-subtask">
          <span>{subTask} </span>
          <FaTimes  className="remove-task" size={18} onClick={(e) => {markDone(e)}} />
        </div>
      )) 
      : <p>Nothing to show!</p>}
    </div>
  )
}

export default SubTasks

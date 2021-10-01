import { FaTimes } from 'react-icons/fa'

const SubTasks = ({task, markDone}) => {
  let cleanSubTasks = task.subTasks.filter((subTask) => subTask.text !== "")

  return (
    <div className="task-subtasks">
      {cleanSubTasks.length > 0 
      ? cleanSubTasks.map((subTask) => (
        <div className="task-subtask">
          { subTask.done ? <span style={{textDecorationLine:"line-through"}}>{subTask.text} </span>
            : <span >{subTask.text} </span>
          }
          
          <FaTimes  className="remove-task" size={18} onClick={(e) => {markDone(e, subTask, task)}} />
        </div>
      )) 
      : <p>Nothing to show!</p>}
    </div>
  )
}

export default SubTasks

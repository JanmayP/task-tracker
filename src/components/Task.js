import { FaTimes } from 'react-icons/fa'
import { AiOutlineArrowRight } from 'react-icons/ai'

const Task = ({task, onDelete, showInfo, showBody, currentTaskId}) => {
  
  let color = "white"
  if (showBody && (currentTaskId === task.id)) {
    color = "aqua"
  }

  return (
    <div className="task">
      <div className="task-text">
        {task.text}
        <p className="task-buttons">
        <AiOutlineArrowRight className="show-info" size={20} onClick={() => {showInfo(task)}} style={{color: color}} />

        <FaTimes  className="remove-task" size={20} onClick={() => {onDelete(task.id)}} />
        </p>
      </div>
    </div>
  )
}

export default Task

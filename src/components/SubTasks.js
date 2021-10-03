import { FaCheck, FaTimes } from 'react-icons/fa'
import { useState } from 'react'


const SubTasks = ({task, markDone, addSubTask, delSubTask}) => {
  let cleanSubTasks = task.subTasks.filter((subTask) => subTask.text !== "")

  const [newST, setNewST] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    if (newST === "") {
      return
    } else {
      const subTask = {
        text: newST,
        done: false
      }

      addSubTask(subTask)

      setNewST("")
    }
  }

  return (
    <>
    <div className="task-subtasks">
      {cleanSubTasks.length > 0 
      ? cleanSubTasks.map((subTask) => (
        <div className="task-subtask">
          { subTask.done ? <span style={{textDecorationLine:"line-through"}}>{subTask.text} </span>
            : <span >{subTask.text} </span>
          }
          <div className="subtask-buttons">
            <FaCheck  className="remove-subtask" size={18} onClick={(e) => {markDone(e, subTask)}} />
            <FaTimes  className="remove-subtask" size={19} onClick={(e) => {delSubTask(e, subTask)}} />
          </div>
        </div>
      )) 
      : <></>}
    </div>
    <form className="add-subtask" onSubmit={onSubmit}>
      <input type='text' id="info-box" placeholder='' value={newST} onChange={(e) => setNewST(e.target.value)} />
      <input type='submit' value='Add Subtask' className='form-btn'/>
    </form>

    </>
  )
}

export default SubTasks

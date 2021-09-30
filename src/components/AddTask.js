import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const AddTask = ({onAdd, showTaskForm}) => {

    const [text, setText] = useState("")
    const [body, setBody] = useState("")
    const [subTask1, setSubTask1] = useState("")
    const [subTask2, setSubTask2] = useState("")
    const [subTask3, setSubTask3] = useState("")
    
    const onSubmit = (e) => {
        e.preventDefault()

        if(!text) {
            alert("Please enter a task")
            return
        }

        const subTasks = [subTask1, subTask2, subTask3]

        onAdd({text, body, subTasks})
            
        setText("")
        setBody("")
        setSubTask1("")
        setSubTask2("")
        setSubTask3("")
        
    }

    return (
        
        <form className="task-form" onSubmit={onSubmit}>
            <p className="task-form-remove"><FaTimes  className="remove-task" size={20} onClick={showTaskForm}/></p>
                <label>Task </label>
                <input type='text'  placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)} />
            <br></br>
                <label>Subtask 1 </label>
                <input type='text' id="sub-tasks" placeholder='Add a subtask' value={subTask1} onChange={(e) => setSubTask1(e.target.value)} />
            <br></br>
                <label>Subtask 2</label>
                <input type='text' id="sub-tasks" placeholder='Add a subtask' value={subTask2} onChange={(e) => setSubTask2(e.target.value)} />
            <br></br>
                <label>Subtask 3</label>
                <input type='text' id="sub-tasks" placeholder='Add a subtask' value={subTask3} onChange={(e) => setSubTask3(e.target.value)} />
            <br></br>
                <label>Info </label>
                <input type='text' id="info-box" placeholder='Add Info' value={body} onChange={(e) => setBody(e.target.value)} />
            <br></br>
            <input type='submit' value='ADD' className='form-btn'/>
        </form>
    )
}

export default AddTask

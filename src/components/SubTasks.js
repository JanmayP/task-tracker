const SubTasks = ({task}) => {
  let cleanSubTasks = task.subTasks.filter((subTask) => subTask !== "")
  return (
    <div className="task-subtasks">
      {cleanSubTasks.map((subTask) => (
        <div className="task-subtask">
          {subTask} 
        </div>
      ))}
    </div>
  )
}

export default SubTasks

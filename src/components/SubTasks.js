const SubTasks = ({task}) => {
  let cleanSubTasks = task.subTasks.filter((subTask) => subTask !== "")
  return (
    <div className="task-subtasks">
      {cleanSubTasks.length > 0 
      ? cleanSubTasks.map((subTask) => (
        <div className="task-subtask">
          {subTask} 
        </div>
      )) 
      : <p>Nothing to show!</p>}
    </div>
  )
}

export default SubTasks

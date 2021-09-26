const TaskBody = ({task}) => {

  if (task.body === "") {
    return (
      <p>
      Nothing to show!</p>
    )
  }
  else return (
    <div className="task-info">
      {task.body}
    </div>
  )
}

export default TaskBody

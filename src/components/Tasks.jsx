const Tasks = ({ tasks }) => {
  return (
    <>
      {tasks.map((task) => (
        <h1 key={task.id}>{task.text}</h1>
      ))}
    </>
  );
};

export default Tasks;

import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="subcontainer">
          <h1>Task Manager</h1>
          <AddTaskForm />
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default App;

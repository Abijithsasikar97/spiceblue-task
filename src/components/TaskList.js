import React from "react";
import { Card } from "antd";
import { connect } from "react-redux";
import Tasks from "./Tasks";

export const TaskList = ({ task }) => {
  return (
    <>
      {task.map((tasks, i) => (
        <Tasks key={i} tasks={tasks} index={i} />
      ))}
    </>
  );
};

const mapStateToProps = (state) => ({
  task: state.task,
});

export default connect(mapStateToProps)(TaskList);

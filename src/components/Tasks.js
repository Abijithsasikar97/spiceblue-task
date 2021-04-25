import React from "react";
import { Card, Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { deleteTask, editTask } from "../redux/action/addTask";
import moment from 'moment';

export const Tasks = ({ tasks, index, deleteTask, editTask }) => {
  const cardStyle = {
    border: "1px solid black",
    display: "flex",
    flexDirection: "row",
  };

  const desStyle = {
    textAlign: "left",
    fontWeight: "bolder",
    fontSize: "18px",
    padding: "unset",
  };

  const btagStyle = {
    color: 'grey'
  }

  return (
    <div>
      <Card style={cardStyle}>
        <p style={desStyle}><b style={btagStyle}>Description:</b> {tasks.description}</p>
        <p style={desStyle}><b style={btagStyle}>End Date:</b> {`${moment(tasks.date).format("DD-MM-YYYY")} ${moment(tasks.time).format("h:mm:ss a")}`}</p>
        <p style={desStyle}><b style={btagStyle}>Assigned To:</b> {tasks.assigto}</p>
        <Tooltip title={"Edit Task"}>
          <Button
            style={{ float: "left" }}
            type="link"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => editTask(index)}
          />
        </Tooltip>
        <Tooltip title={"Delete Task"}>
          <Button
            style={{ float: "right" }}
            type="link"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => deleteTask(index)}
          />
        </Tooltip>
      </Card>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
    deleteTask: key => dispatch(deleteTask(key)),
    editTask: key => dispatch(editTask(key))
})

export default connect(null,mapDispatchToProps)(Tasks);

import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Row,
  Col,
  Card,
} from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { addTask, addObject, editedTask } from "../redux/action/addTask";
import { ProfileOutlined, PlusOutlined } from "@ant-design/icons";

export class AddTaskForm extends Component {
  formRef = React.createRef();

  state = {
    showUpdate: true,
  };

  handleSaveSubmit = (e) => {
    // alert(JSON.stringify(e.description))
    let data = {
      description: e.description,
      date: e.date,
      time: e.time,
      assigto: e.Assigto,
    };
    this.props.addObject(data);
    // alert(this.props.selected);
    if (this.props.selected || this.props.selected === 0)
      this.props.editedTask({
        value: this.props.value,
        selected: this.props.selected,
      });
    else this.props.addTask(this.props.value);
    let formFeilds = document.getElementById("addtask-form");
    formFeilds.reset();
  };

  clearField = () => {
    let formFeilds = document.getElementById("addtask-form");
    formFeilds.reset();
    this.setState({
      showUpdate: false,
    });
    formFeilds.style = 'display: none;'
  };

  showForm = () => {
    let showhideForm = document.getElementById("addtask-form");
    showhideForm.style = "display: block;";
  };

  componentDidMount() {
    let showhideForm = document.getElementById("addtask-form");
    showhideForm.style = "display: none;";
  }

  componentDidUpdate() {
    if (this.props.value.description != undefined && this.formRef != null) {
      this.formRef.current.setFieldsValue({
        description: this.props.value.description,
        date: moment(this.props.value.date),
        time: moment(this.props.value.time),
        Assigto: this.props.value.assigto,
      });
    }
  }

  render() {
    const { description, date, assigto, time } = this.props.value;
    const { showUpdate } = this.state;
    return (
      <Card
        style={{ backgroundColor: "aliceblue" }}
        title={`Tasks ${this.props.task.length}`}
        extra={<PlusOutlined onClick={this.showForm} />}
      >
        <Form
          style={{ bottom: "20px" }}
          ref={this.formRef}
          id="addtask-form"
          layout="vertical"
          name="taskform"
          onFinish={this.handleSaveSubmit}
        >
          <Form.Item
            label="Task Description"
            name="description"
            rules={[{ required: true, message: "Please Add description" }]}
            style={{marginTop: '10px'}}
          >
            <Input
              suffix={<ProfileOutlined />}
              type="text"
              value={description}
            />
          </Form.Item>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please select date!" }]}
              >
                <DatePicker value={date} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Please select time!" }]}
              >
                <TimePicker use12Hours format="h:mm a" value={time} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Assign User"
            name="Assigto"
            rules={[{ required: true, message: "Please Add Assignee" }]}
          >
            <Input value={assigto} />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ float: "right", backgroundColor: "green" }}
              type="primary"
              htmlType="submit"
            >
              {(this.props.selected || this.props.selected === 0) && showUpdate
                ? "Update"
                : "Save"}
            </Button>
            {this.props.selected === undefined ? (
              <Button
                onClick={this.clearField}
                style={{ float: "right", marginRight: "20px" }}
                type="text"
              >
                Cancel
              </Button>
            ) : (
              ""
            )}
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTask: (task) => dispatch(addTask(task)),
  addObject: (value) => dispatch(addObject(value)),
  editedTask: (valueObj) => dispatch(editedTask(valueObj)),
});

const mapStateToProps = (state) => ({
  value: state.value,
  selected: state.selected,
  task: state.task,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);

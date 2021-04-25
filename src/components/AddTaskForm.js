import React, { Component } from "react";
import { Form, Input, Button, DatePicker, TimePicker, Row, Col } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { addTask, addObject, editedTask } from "../redux/action/addTask";

export class AddTaskForm extends Component {
  formRef = React.createRef();

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

//   onDateChange = (date, dateString) => {
//     console.log(date, dateString);
//   };

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
    return (
      <Form
        style={{ bottom: "20px" }}
        ref={this.formRef}
        id="addtask-form"
        layout="vertical"
        name="taskform"
        onFinish={this.handleSaveSubmit}
      >
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please Add description" }]}
        >
          <Input type="text" value={description} />
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
              <TimePicker value={time} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Assignee"
          name="Assigto"
          rules={[{ required: true, message: "Please Add Assignee" }]}
        >
          <Input value={assigto} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {this.props.selected === 0 ? "Update" : "Save"}
          </Button>
        </Form.Item>
      </Form>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);

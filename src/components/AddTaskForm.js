import React, { Component } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { addTask, addObject } from "../redux/action/addTask";


export class AddTaskForm extends Component {
    formRef = React.createRef();

    handleSaveSubmit = (e) => {
        // alert(JSON.stringify(e.description))
        let data = {
            description: e.description,
            date: moment(e.date).format("DD-MM-YYYY"),
            assigto: e.Assigto
        }
        this.props.addObject(data)
        this.props.addTask(this.props.value);
        this.formRef.current.resetFields();
    }

    onDateChange = (date, dateString) => {
        console.log(date, dateString);
    }

  render() {
    const {description, date, assigto} = this.props.value;
    return (
      <Form
        layout="inline"
        name="taskform"
        initialValues={this.props.value}
        onFinish={this.handleSaveSubmit}
      >
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please Add description" }]}
        >
          <Input value={description} />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select date!" }]}
        >
          <DatePicker value={date} onChange={this.onDateChange} />
        </Form.Item>

        <Form.Item
          label="Assignee"
          name="Assigto"
          rules={[{ required: true, message: "Please Add Assignee" }]}
        >
          <Input value={assigto} />
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    addTask : task => dispatch(addTask(task)),
    addObject : value => dispatch(addObject(value))
});

const mapStateToProps = state => ({
    value:state.value
})

export default connect(mapStateToProps,mapDispatchToProps)(AddTaskForm);

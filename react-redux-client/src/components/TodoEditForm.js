import React from "react";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";

const wellStyles = { maxWidth: 400, margin: "0 auto 10px" };

const TodoEditForm = props => {
  return (
    <form
      className="form form-horizontal"
      id="EditTodoForm"
      onSubmit={props.editTodo}
    >
      <div className="row">
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Todo: </ControlLabel>
            <input type="hidden" value={props.todoData._id} name="id" />
            <FormControl
              type="text"
              placeholder="Enter todo"
              name="todoText"
              defaultValue={props.todoData.todoText}
            />
          </FormGroup>
        </div>
        <div className="col-md-12">
          <FormGroup>
            <ControlLabel>Description: </ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Enter description"
              name="todoDesc"
              defaultValue={props.todoData.todoDesc}
            />
          </FormGroup>
        </div>
      </div>
      <FormGroup>
        <Button
          style={wellStyles}
          type="submit"
          bsStyle="primary"
          bsSize="large"
          block
        >
          Submit
        </Button>
      </FormGroup>
    </form>
  );
};

export default TodoEditForm;

import React from "react";
import { Alert, Glyphicon, Button, Modal } from "react-bootstrap";
import { Link } from "react-router";
import TodoEditForm from "./TodoEditForm";
import MaterialIcon, { colorPallet } from "material-icons-react";
import "./App.css";

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.submitEditTodo = this.submitEditTodo.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
    this.cofirmDeleteTodo = this.cofirmDeleteTodo.bind(this);

    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

    this.state = { date: date };
  }

  componentWillMount() {
    this.props.fetchTodos();
  }

  showEditModal(todoToEdit) {
    this.props.mappedshowEditModal(todoToEdit);
  }

  hideEditModal() {
    this.props.mappedhideEditModal();
  }

  submitEditTodo(e) {
    e.preventDefault();
    const editForm = document.getElementById("EditTodoForm");
    if (editForm.todoText.value !== "") {
      const data = new FormData();
      data.append("id", editForm.id.value);
      data.append("todoText", editForm.todoText.value);
      data.append("todoDesc", editForm.todoDesc.value);
      this.props.mappedEditTodo(data);
    } else {
      return;
    }
  }

  hideDeleteModal() {
    this.props.mappedhideDeleteModal();
  }

  showDeleteModal(todoToDelete) {
    this.props.mappedshowDeleteModal(todoToDelete);
  }

  cofirmDeleteTodo() {
    this.props.mappedDeleteTodo(this.props.mappedTodoState.todoToDelete);
  }

  render() {
    const todoState = this.props.mappedTodoState;
    const todos = todoState.todos;
    const editTodo = todoState.todoToEdit;
    return (
      <div className="col-md-12">
        <h4>{this.state.date}</h4>
        <h3 className="centerAlign">Todos</h3>
        {!todos && todoState.isFetching && <p>Loading todos....</p>}
        {todos.length <= 0 &&
          !todoState.isFetching && (
            <p>No Todos Available. Add A Todo to List here.</p>
          )}
        {todos &&
          todos.length > 0 &&
          !todoState.isFetching && (
            <table
              className="table booksTable striped
              bordered
              condensed
              hover"
            >
              <thead>
                <tr>
                  <th>Todo</th>
                  <th className="textCenter">Edit</th>
                  <th className="textCenter">Delete</th>
                  <th className="textCenter">View</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, i) => (
                  <tr key={i}>
                    <td>
                      <h4>{todo.todoText}</h4>
                    </td>
                    <td className="textCenter">
                      <Button
                        onClick={() => this.showEditModal(todo)}
                        bsSize="small"
                      >
                        <MaterialIcon icon="create" size={15} color="#424242" />
                      </Button>
                    </td>
                    <td className="textCenter">
                      <Button
                        onClick={() => this.showDeleteModal(todo)}
                        bsSize="small"
                      >
                        <MaterialIcon
                          icon="delete_forever"
                          size={15}
                          color="#424242"
                        />
                      </Button>
                    </td>
                    <td className="textCenter">
                      <Button bsSize="xsmall" href={`/${todo._id}`}>
                        <MaterialIcon icon="launch" size={15} color="#424242" />
                        &nbsp; View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        <Modal
          show={todoState.showEditModal}
          onHide={this.hideEditModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Edit Your Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12">
              {editTodo && (
                <TodoEditForm
                  todoData={editTodo}
                  editTodo={this.submitEditTodo}
                />
              )}
              {editTodo &&
                todoState.isFetching && (
                  <Alert bsStyle="info">
                    <strong>Updating...... </strong>
                  </Alert>
                )}
              {editTodo &&
                !todoState.isFetching &&
                todoState.error && (
                  <Alert bsStyle="danger">
                    <strong>Failed. {todoState.error} </strong>
                  </Alert>
                )}
              {editTodo &&
                !todoState.isFetching &&
                todoState.successMsg && (
                  <Alert bsStyle="success">
                    Book <strong> {editTodo.todoText} </strong>
                    {todoState.successMsg}
                  </Alert>
                )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideEditModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={todoState.showDeleteModal}
          onHide={this.hideDeleteModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Delete Your Book
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {todoState.todoToDelete &&
              !todoState.error &&
              !todoState.isFetching && (
                <Alert bsStyle="warning">
                  Are you sure you want to delete this todo{" "}
                  <strong>{todoState.todoToDelete.todoText} </strong> ?
                </Alert>
              )}
            {todoState.todoToDelete &&
              todoState.error && (
                <Alert bsStyle="warning">
                  Failed. <strong>{todoState.error} </strong>
                </Alert>
              )}

            {todoState.todoToDelete &&
              !todoState.error &&
              todoState.isFetching && (
                <Alert bsStyle="success">
                  <strong>Deleting.... </strong>
                </Alert>
              )}

            {!todoState.todoToDelete &&
              !todoState.error &&
              !todoState.isFetching && (
                <Alert bsStyle="success">
                  Todo <strong>{todoState.successMsg} </strong>
                </Alert>
              )}
          </Modal.Body>
          <Modal.Footer>
            {!todoState.successMsg &&
              !todoState.isFetching && (
                <div>
                  <Button onClick={this.cofirmDeleteTodo}>Yes</Button>
                  <Button onClick={this.hideDeleteModal}>No</Button>
                </div>
              )}
            {todoState.successMsg &&
              !todoState.isFetching && (
                <Button onClick={this.hideDeleteModal}>Close</Button>
              )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

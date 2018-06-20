import { connect } from "react-redux";
import * as todoActions from "../actions/todoActions";
import Todos from "../components/Todos";

const mapStateToProps = (state, ownProps) => {
  return {
    mappedTodoState: state.todoState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTodos: () => dispatch(todoActions.fetchTodos()),
    mappedDeleteTodo: todoToDelete =>
      dispatch(todoActions.deleteTodo(todoToDelete)),
    mappedEditTodo: todoToEdit => dispatch(todoActions.editTodo(todoToEdit)),
    mappedshowEditModal: todoToEdit =>
      dispatch(todoActions.showEditModal(todoToEdit)),
    mappedhideEditModal: () => dispatch(todoActions.hideEditModal()),
    mappedDeleteTodo: todoToDelete =>
      dispatch(todoActions.deleteTodo(todoToDelete)),
    mappedshowDeleteModal: todoToDelete =>
      dispatch(todoActions.showDeleteModal(todoToDelete)),
    mappedhideDeleteModal: () => dispatch(todoActions.hideDeleteModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);

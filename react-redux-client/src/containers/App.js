import { connect } from "react-redux";
import * as appActions from "../actions/appActions";
import App from "../components/App";
import * as todoActions from "../actions/todoActions";

const mapStateToProps = state => {
  return {
    mappedAppState: state.appState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mappedToggleAddTodo: () => dispatch(appActions.toggleAddTodo()),
    mappedAddTodo: todo => dispatch(todoActions.addNewTodo(todo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

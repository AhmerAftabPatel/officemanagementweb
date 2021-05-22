import { connect } from 'react-redux';

import { fetchTask, updateTask, deleteTask } from '../../actions/task_actions';
import TaskShow from './task_show';

const mapStateToProps = (state) => ({
  user: state.session.username,
  groups: state.entities.groups
});

const mapDispatchToProps = dispatch => ({
  fetchTask: (id,token) => dispatch(fetchTask(id,token)),
  updateTask: (task,token) => dispatch(updateTask(task,token)),
  deleteTask: (token,id) => dispatch(deleteTask(id,token))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskShow);
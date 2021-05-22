import { RECEIVE_ATTENDANCE } from "../../actions/attend_actions";

import merge from "lodash/merge";

const attendanceReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = merge({}, state);

  switch (action.type) {
    case RECEIVE_ATTENDANCE:
      action.attendances.forEach(attendance => {
        nextState[attendance._id] = attendance;
      });
      return nextState;

    default:
      return state;
  }
};

export default attendanceReducer;

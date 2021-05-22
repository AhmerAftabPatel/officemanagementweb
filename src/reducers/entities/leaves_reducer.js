import { RECEIVE_LEAVES } from "../../actions/leave_actions";

import merge from "lodash/merge";

const leaveReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = merge({}, state);

  switch (action.type) {
    case RECEIVE_LEAVES:
      action.leave.forEach(leave => {
        nextState[leave._id] = leave;
      });
      return nextState;
    default:
      return state;
  }
};

export default leaveReducer;

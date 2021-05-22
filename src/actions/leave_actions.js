import * as LeaveApiUtil from "../util/leave_api_util";

export const RECEIVE_LEAVES = "RECEIVE_LEAVES";

export const receiveLeaves = payload => ({
  type: RECEIVE_LEAVES,
  leave : payload.data.leaves
});

export const fetchleaves = () => dispatch =>
  LeaveApiUtil.fetchleaves().then(leaves => dispatch(receiveLeaves(leaves)));

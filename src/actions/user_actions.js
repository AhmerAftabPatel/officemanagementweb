import * as UserAPIUtil from "../util/user_api_util";

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_SINGLE_USER = "RECEIVE_SINGLE_USER";
export const RECEIVE_GROUP_USERS = "RECEIVE_GROUP_USERS";

const receiveSingleUser = payload => ({
  type: RECEIVE_SINGLE_USER,
  payload: payload.data
});

export const fetchAllUsers = () => dispatch =>
  UserAPIUtil.fetchAllUsers().then(users => dispatch(receiveAllUsers(users)));

export const fetchSingleUser = id => dispatch =>
  UserAPIUtil.fetchSingleUser(id).then(user =>
    dispatch(receiveSingleUser(user))
  );
const receiveAllUsers = payload => ({
  type: RECEIVE_ALL_USERS,
  payload: payload.data
});

export const receiveGroupUsers = payload => ({
  type: RECEIVE_GROUP_USERS,
  groupUsers: payload.data.groups
});

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  }
  return false;
};
export const isToken = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwtToken")) {
    return JSON.parse(localStorage.getItem("jwtToken"));
  }
  return false;
};

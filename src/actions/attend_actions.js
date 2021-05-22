import * as AttendApiUtil from "../util/attend_api_util";

export const RECEIVE_ATTENDANCE = "RECEIVE_ATTENDANCE";

export const receiveattendance = payload => ({
  type: RECEIVE_ATTENDANCE,
  attendances: payload.data.attendances
});

export const fetchAttendance = (token) => dispatch =>
  AttendApiUtil.fetchAttendance(token).then(attendance =>
    dispatch(receiveattendance(attendance))
  );

import React, { useReducer } from "react";
import axios from "axios";
import MeetingContext from "../components/admintools/meetings/meeting_context";
import meetingReducer from "../reducers/entities/mom";
import {
  GET_MEETINGS,
  ADD_MEETING,
  DELETE_MEETING,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_MEETING,
  FILTER_MEETINGS,
  CLEAR_MEETINGS,
  CLEAR_FILTER,
  MEETING_ERROR,
} from "../components/admintools/meetings/types";
import { constants } from "../constants";

const MeetingState = props => {
  const initialState = {
    meetings: [],
    // users: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(meetingReducer, initialState);

  // Get Meetings from db
  const getMeetings = async () => {
    try {
      const res = await axios.get(`${constants}/api/v1/meetings`);
      dispatch({ type: GET_MEETINGS, payload: res.data });
    } catch (err) {
      dispatch({ type: MEETING_ERROR, payload: err.response.msg });
    }
  };
  // const getUsers = async () => {
  //   try {
  //     const res = await axios.get(`${constants}/api/users`);
  //     dispatch({ type: GET_USERS, payload: res.data });
  //   } catch (err) {
  //     dispatch({ type: USER_ERROR, payload: err.response.msg });
  //   }
  // };

  // Add Meeting
  const addMeeting = async meeting => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post(
        `${constants}/api/v1/meetings`,
        meeting, 
        config
      );
      // res.data is a responce from the server containing sent meeting
      dispatch({ type: ADD_MEETING, payload: res.data });
    } catch (err) {
      dispatch({ type: MEETING_ERROR, payload: err.response.msg });
    }
  };

  // Update Meeting
  const updateMeeting = async meeting => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        `${constants}/api/v1/meetings/${meeting._id}`,
        meeting,
        config
      );
      dispatch({ type: UPDATE_MEETING, payload: res.data });
    } catch (err) {
      dispatch({ type: MEETING_ERROR, payload: err.response.msg });
    }
  };

  // Delete Meeting
  const deleteMeeting = async id => {
    try {
      await axios.delete(`${constants}/api/v1/meetings/${id}`);
      dispatch({ type: DELETE_MEETING, payload: id });
    } catch (err) {
      dispatch({ type: MEETING_ERROR, payload: err.response.msg });
    }
  };

  const setCurrent = meeting =>
    dispatch({ type: SET_CURRENT, payload: meeting });

  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  const clearMeetings = () => dispatch({ type: CLEAR_MEETINGS });

  const filterMeetings = text =>
    dispatch({ type: FILTER_MEETINGS, payload: text });

  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  return (
    <MeetingContext.Provider
      value={{
        meetings: state.meetings,
        // users: state.users,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getMeetings,
        addMeeting,
        // getUsers,
        updateMeeting,
        deleteMeeting,
        setCurrent,
        clearCurrent,
        filterMeetings,
        clearFilter,
        clearMeetings
      }}
    >
      {props.children}
    </MeetingContext.Provider>
  );
};

export default MeetingState;

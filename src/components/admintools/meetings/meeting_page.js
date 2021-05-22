import React, { useEffect, useState } from "react";
import Meetings from "./meetings";
import MeetingsForm from "./meeting_form";
import MeetingFilter from "./meeting_filter";
import { getUsers } from "../../../util/task_api_util";
const MeetingPage = () => {
  const [users, setUsers] = useState([]);
  const preload = () => {
    getUsers().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data.data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  return (
    <>
      <div>
        <div className="section ml-5">
          <div>
            <MeetingsForm users={users} />
          </div>
          <div>
            <MeetingFilter />
            <Meetings />
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingPage;

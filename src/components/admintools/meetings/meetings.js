import React, { Fragment, useContext, useEffect } from 'react';
import MeetingItem from './meeting_item';
import MeetingContext from './meeting_context';
// import Loader from '../layout/Loader';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Loader from './Loader';

const Meetings = (props) => {
  const meetingContext = useContext(MeetingContext);

  const { meetings, filtered,getMeetings, loading } = meetingContext;

  useEffect(() => {
    getMeetings();
    // eslint-disable-next-line
  }, []);

  if (meetings !== null && meetings.length === 0 && !loading) {
    return <h4>Meeting list is empty</h4>;
  }

  return (
    <Fragment>
      {meetings !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((meeting) => (
                <CSSTransition key={meeting._id} timeout={500} classNames="item">
                  <MeetingItem meeting={meeting} type={props.type} showChildrenDrawer={props.showChildrenDrawer}/>
                </CSSTransition>
              ))
            : meetings.map((meeting) => (
                <CSSTransition key={meeting._id} timeout={500} classNames="item">
                  <MeetingItem meeting={meeting} type={props.type} showChildrenDrawer={props.showChildrenDrawer}/>
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Loader />
        // "loading..."
      )}
    </Fragment>
  );
};

export default Meetings;

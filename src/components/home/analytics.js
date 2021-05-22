import React, { Fragment, useState, useEffect, useContext } from "react";
import { Grid, Card, CardContent, Container } from "@material-ui/core";
import { GuardSpinner } from "react-spinners-kit";
// import { fetchleaves } from "../../util/leave_api_util";
import { fetchleaves } from "../../actions/leave_actions";
import { Link } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import {
  Header,
  Segment,
  Button,
  Tab,
  Label,
  Menu,
  Icon
} from "semantic-ui-react";
import { fetchNotice } from "../../util/notice_api_util";
import moment from "moment";
import { Modal } from "react-materialize";
import AddNoticeModal from "./add_notice_modal";
import Notifications from "./Notifications";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
import "antd/dist/antd.css";
import Meetings from "../admintools/meetings/meetings";
// import MeetingState from "../../actions/mom";
import MeetingForm from "../admintools/meetings/meeting_form";
// import AlertState from "../admintools/meetings/AlertState";
import MeetingContext from "../admintools/meetings/meeting_context";

/**
 * @author
 * @function Analytics
 **/
const Analytics = props => {
  // const [leaves, setLeaves] = useState([]);
  const [notices, setNotice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const tasks = useSelector(state => Object.values(state.entities.tasks));
  const users = useSelector(state => Object.values(state.entities.users));
  const leaves = useSelector(state => state.entities.leaves);
  const meetingContext = useContext(MeetingContext);
  const { clearCurrent } = meetingContext;
  const dispatch = useDispatch();
  const preload = users => {
    if (users) {
      setLoading(false);
    }
  };
  const preloadNotice = () => {
    fetchNotice().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setNotice(data.data);
      }
    });
  };

  preload();
  useEffect(() => {
    dispatch(fetchleaves());
    preloadNotice();
  }, [dispatch]);
  const endDate = `${
    new Date().getMonth() + 1
  } ${new Date().getDate()} ${new Date().getFullYear()}`;

  const filteredTasks = tasks.filter(
    task => task.completed === true && task.isConfirmed === false
  );
  const comTasks = tasks.filter(task => task.completed === true);
  const notice = notices.filter(
    notice =>
      moment(endDate).format("MMMM D YYYY") <=
        moment(notice.created).format("MMMM D YYYY") &&
      moment(endDate).format("D") > moment(notice.created).format("D") - 5
  );
  const onClose = () => {
    setVisible(false);
  };
  const clearAll = () => clearCurrent();
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
    clearAll();
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const panes = [
    {
      menuItem: "Analytics",
      render: () => (
        <Tab.Pane attached={false}>
          <Grid container spacing={6} className=" mt-4">
            <Grid item xs={12} sm={4}>
              <Link to="/user/allusers">
                <div className="text-center analytics-fluid">
                  <div>
                    <i className="fas fa-user fa-4x"></i>
                  </div>
                  <div className="mt-3 line-height-sm">
                    <b className="font-size-lg">{Object.keys(users).length}</b>
                    <span className="text-black-50 d-block">Agents</span>
                  </div>
                </div>
              </Link>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className="text-center analytics-fluid">
                <div>
                  <i
                    className="fas fa-tasks fa-4x"
                    style={{ color: "#90EE90" }}
                  ></i>
                </div>
                <div className="mt-3 line-height-sm">
                  <b className="font-size-lg">{Object.keys(tasks).length}</b>
                  <span className="text-black-50 d-block">Total Tasks</span>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Link to="/admin/leaves">
                <div className="text-center analytics-fluid">
                  <div>
                    <i
                      className="fas fa-bed fa-4x"
                      style={{ color: "#ADD8E6" }}
                    ></i>
                  </div>
                  <div className="mt-3 line-height-sm">
                    <b className="font-size-lg">{Object.keys(leaves).length}</b>
                    <span className="text-black-50 d-block">on leave</span>
                  </div>
                </div>
              </Link>
            </Grid>
            <Grid item xs={12} lg={4}>
              <div className="text-center analytics-fluid">
                <div>
                  <i
                    className="far fa-check-circle fa-4x"
                    style={{ color: "green" }}
                  ></i>
                </div>
                <div className="mt-3 line-height-sm">
                  <b className="font-size-lg">{Object.keys(comTasks).length}</b>
                  <span className="text-black-50 d-block">completed tasks</span>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="text-center analytics-fluid">
                <div>
                  <i
                    className="fas fa-exclamation-circle fa-4x"
                    style={{ color: "red" }}
                  ></i>
                </div>
                <div className="mt-3 line-height-sm">
                  <b className="font-size-lg">
                    {Object.keys(tasks).length - Object.keys(comTasks).length}
                  </b>
                  <span className="text-black-50 d-block">pending tasks</span>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div
                onClick={showDrawer}
                style={{ cursor: "pointer", color: "brown" }}
              >
                <i className="far fa-handshake fa-4x"></i>
              </div>
              <span className="text-black-50 d-block">View Meetings</span>
              <Drawer
                width={420}
                title={
                  <Button
                    className="adduser"
                    style={{ color: "black", backgroundColor: "brown" }}
                    type="primary"
                    onClick={() => showChildrenDrawer()}
                  >
                    Add Meeting
                  </Button>
                }
                placement={"right"}
                closable={false}
                onClose={onClose}
                visible={visible}
                key={"right"}
              >
                <Meetings
                  type={"homePage"}
                  showChildrenDrawer={showChildrenDrawer}
                />
                <Drawer
                  title="Meeting"
                  width={320}
                  closable={false}
                  onClose={onChildrenDrawerClose}
                  visible={childrenDrawer}
                >
                  <MeetingForm users={users} />
                </Drawer>
                {/* </AlertState>
                </MeetingState> */}
              </Drawer>
            </Grid>
          </Grid>
        </Tab.Pane>
      )
    },
    {
      menuItem: (
        <Menu.Item as="a">
          <Icon name="sticky note outline" /> Notice
          <Label color="red" floating>
            {notice.length}
          </Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane attached={false}>
          <Grid container spacing={6} className=" mt-4">
            <Container style={{ height: "332px", overflow: "auto" }}>
              <Header as="h2" textAlign="center">
                Notice - {moment(new Date()).format("MMMM D YYYY")}
              </Header>
              <p>
                <Modal
                  id="create-notice-modal"
                  trigger={
                    <Button style={buttonAdd} float="right">
                      Add Notice
                    </Button>
                  }
                >
                  <div className="modal-content">
                    <AddNoticeModal
                      createNoticeClicked={() => preloadNotice()}
                    />
                  </div>
                </Modal>
              </p>

              <Segment
                textAlign="center"
                style={{ margin: "auto", overflow: "auto" }}
              >
                {notice.map(note => {
                  return (
                    <Segment
                      key={note.id}
                      textAlign="center"
                      style={{
                        width: "max-comtent",
                        height: "200px",
                        color: "blue",
                        backgroundColor: "khaki"
                      }}
                    >
                      <Header as="h2">{note.name}</Header>
                      <p>description : {note.description}</p>
                      <p>Date : {moment(note.created).format("MMMM D YYYY")}</p>
                    </Segment>
                  );
                })}
              </Segment>
            </Container>
          </Grid>
        </Tab.Pane>
      )
    },
    {
      menuItem: (
        <Menu.Item as="a">
          <Icon name="tasks" /> Need Approoval
          <Label color="red" floating>
            {filteredTasks.length}
          </Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane attached={false}>
          <Grid container spacing={6} className=" mt-4">
            <Container style={{ height: "332px", overflow: "auto" }}>
              <Notifications
                tasks={filteredTasks}
                onclickTask={props.onclickTask}
                history={props.history}
              />
            </Container>
          </Grid>
        </Tab.Pane>
      )
    }
  ];

  return (
    <div className="analytics-container">
      <Fragment>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            <Card className="card-box mb-4">
              <CardContent className="p-2">
                {loading ? (
                  <div
                    style={{
                      marginLeft: "46%",
                      marginTop: "15%",
                      marginBottom: "15%"
                    }}
                  >
                    <GuardSpinner size={50} color="#686769" />
                  </div>
                ) : (
                  <div>
                    <div className="text-center py-4">
                      <Tab
                        menu={{ secondary: true, attached: "bottom" }}
                        panes={panes}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    </div>
  );
};

export default Analytics;

const buttonAdd = {
  color: "white",
  backgroundColor: "black"
};

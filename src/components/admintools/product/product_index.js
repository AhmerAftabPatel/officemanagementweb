import React from "react";
// import NavBarContainer from "../../navbar/navbar_container";
import Default from "../../../assets/images/Default.png";
import { Link } from "react-router-dom";
// import { Button } from "@material-ui/core";
import { constants } from "../../../constants";
import {
  Button,
  Segment,
  Grid,
  List,
  Image,
  Header,
  Divider
} from "semantic-ui-react";
import ProductViewTabs from "./product_view_tabs";

// const $ = window.$;

class ViewProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snackOpen: false,
      category: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    const token = localStorage.getItem("jwtToken");
    this.props.fetchTasks(token);
    this.props.fetchUsers();
    fetch(`${constants}/api/v1/category/${this.props.match.params.categoryId}`)
      .then(response => response.json())
      .then(category => {
        this.setState({ category: category.cate });
      });

    // this.props.read();
  }

  handleClick() {
    this.setState({ snackOpen: true });
  }

  handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackOpen: false });
  }

  renderComplete(complete) {
    if (complete) {
      return "complete";
    } else {
      return "incomplete";
    }
  }

  render() {
    let categoryId = this.props.match.params.categoryId;
    if (!this.props.tasks) return null;
    let { tasks } = this.props;
    let uniqueChars = [];
    tasks.forEach(task => {
      if (!uniqueChars.includes(task.userId)) {
        uniqueChars.push(task.userId);
      }
    });
    let category = this.state.category;

    return (
      <div className = "mt-5">
        <Header align="center" as="h1">
          {category.name}({category.type})
        </Header>

        <Grid
          columns={2}
          style={{
            marginTop: "5px",
            marginLeft: window.innerWidth < 800 ? "5px" : "200px",
            overflow: "auto"
          }}
        >
          <Grid.Row>
            <Grid.Column>
              <Segment
                style={{
                  width: "100%",
                  height: "300px",
                  float: "right"
                }}
              >
                <Grid>
                  <Grid.Row className="ml-4">
                    <Grid.Column width={8}>
                      <Header>
                        <span style={{ color: "blue" }}>Completed Tasks</span>
                      </Header>
                      {tasks.map(task => {
                        if (
                          task.cateId === categoryId &&
                          task.completed === true
                        ) {
                          return (
                            <>
                              <p>-{task.name}</p>
                            </>
                          );
                        } else return null;
                      })}
                    </Grid.Column>
                    <Divider vertical></Divider>
                    <Grid.Column width={8}>
                      <Header>
                        <span style={{ color: "red" }}>Pending Tasks</span>
                      </Header>
                      {tasks.map(task => {
                        if (
                          task.cateId === categoryId &&
                          task.completed === false
                        ) {
                          return (
                            <>
                              <p>-{task.name}</p>
                            </>
                          );
                        } else return null;
                      })}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment
                style={{
                  width: "55%",
                  height: "100%"
                }}
              >
                <Header>Agents working on this product</Header>
                {uniqueChars.map(user => {
                  return (
                    <List divided verticalAlign="middle">
                      <List.Item>
                        <List.Content floated="right">
                          <Link
                            style={{ marginLeft: "5px" }}
                            to={`/user/${user}`}
                          >
                            <Button>View</Button>
                          </Link>
                        </List.Content>
                        <Image
                          avatar
                          src={
                            user
                              ? `${constants}/api/photo/${user}`
                              : Default
                          }
                        />
                        <List.Content>
                          {" "}
                          <iframe
                            type="text/html"
                            title="none"
                            src={
                              user
                                ? `${constants}/api/v1/user/username/${user}`
                                : "no name"
                            }
                            width="80px"
                            height="23px"
                            scrolling="no"
                            frameBorder="0"
                          />
                        </List.Content>
                      </List.Item>
                    </List>
                  );
                })}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ProductViewTabs tasks = {tasks}/>
      </div>
    );
  }
}

export default ViewProduct;

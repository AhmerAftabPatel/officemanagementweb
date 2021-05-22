import React, { useEffect, useState } from "react";
import { Container, Grid, Header, Image, Segment,Message} from "semantic-ui-react";
import { isAuthenticated } from "../../actions/user_actions";
import { constants } from "../../constants";
import { fetchTaskByUserId } from "../../util/task_api_util";
// import { fetchSingleUser } from "../../util/user_api_util";

/**
 * @author
 * @function UserProfile
 **/

const UserProfile = props => {
//   const [user, setUser] = useState([]);
  const [task] = useState([]);

//   const preload = id => {
//     fetchSingleUser(id)
//       .then(data => {
//         setUser(data.data);
//       })
//       .catch(err => console.log(err));
//   };
  const preTask = id => {
    fetchTaskByUserId(id)
      .then(data => {
        // setTask(data.data.task);
        console.log(data)
      })
      .catch(err => console.log(err));
  };
  const { id } = props.match.params;
  console.log(task)
  useEffect(() => {
    // preload(id);
    preTask(id);
  }, [id]);
  return (
    <Container fluid>
      <Container style={profileContainer}>
        <Grid columns="equal">
          <Grid.Column>
            <Segment style={{ padding: "0px" }}>
              <Image
                centered
                size="small"
                src={`${constants}/api/photo/${props.match.params.id}`}
              />
              <Header as="h2">{isAuthenticated().fName}</Header>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              {task.map(tas => {
                  return (
                <Message>
                  <Message.Header>{tas.name}</Message.Header>
                  <p>
                   {tas.description}
                  </p>
                </Message>
                  );
              })}
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>3</Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </Container>
  );
};

export default UserProfile;

const profileContainer = {
  marginTop: "10px",
  marginBottom: "5px"
};

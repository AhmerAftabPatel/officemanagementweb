import React from "react";
import { Container, Header, Image } from "semantic-ui-react";
import Default1 from "../../assets/images/background.jpg";

/**
 * @author
 * @function SingleTaskModal
 **/

const SingleTaskModal = props => {
  return (
    <Container style={{ margin: "auto" }}>
        <Header as = 'h2'> Is a dummy Image</Header>
      <Image size="big" src={Default1} />
    </Container>
  );
};

export default SingleTaskModal;

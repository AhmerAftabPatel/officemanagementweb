import React from "react";
import PropTypes from "prop-types";
import { Icon, Menu, Sidebar, Image } from "semantic-ui-react";
// import { Link } from "react-router-dom";
import fruitManiaLogoNew from "../../assets/images/atm.jpg";

class MobileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: false
    };
  }

  handleSidebarHide = () => {
    setTimeout(() => {
      this.setState({
        sidebarOpened: false
      });
    }, 1000);
  };

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { sidebarOpened } = this.state;
    return (
      <>
        <Sidebar
          as={Menu}
          animation="overlay"
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item>
            <Image size="mini" src={fruitManiaLogoNew} centered />
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <Menu>
            <Menu.Item onClick={this.handleToggle} dimmed="true">
              <Icon name="sidebar" size="large" color="brown" />
            </Menu.Item>
          </Menu>
        </Sidebar.Pusher>
      </>
    );
  }
}

MobileContainer.propTypes = {
  cartItemsCount: PropTypes.number.isRequired
};

export default MobileContainer;

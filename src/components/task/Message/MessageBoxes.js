import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const SuccessMessageBox = props => (
  <Message
    positive
    onDismiss={props.handleDismiss}
    header={props.header}
    content={props.content}
    {...props.attributes}
  />
);

const FailureMessageBox = props => (
  <Message
    negative
    onDismiss={props.handleDismiss}
    header={props.header}
    content={props.content}
    {...props.attributes}
  />
);

SuccessMessageBox.propTypes = {
  header: PropTypes.string,
  content: PropTypes.string,
  handleDismiss: PropTypes.func.isRequired,
  attributes: PropTypes.object,
};
SuccessMessageBox.defaultProps = {
  header: null,
  content: null,
  attributes: null,
};
FailureMessageBox.propTypes = {
  header: PropTypes.string,
  content: PropTypes.string,
  handleDismiss: PropTypes.func.isRequired,
  attributes: PropTypes.object,
};
FailureMessageBox.defaultProps = {
  header: null,
  content: null,
  attributes: null,
};
export { SuccessMessageBox, FailureMessageBox };

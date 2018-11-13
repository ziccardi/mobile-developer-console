import React, { Component } from 'react';
import { MenuItem, MessageDialog } from 'patternfly-react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { deleteApp } from '../actions/apps';
import { deleteBinding } from '../actions/serviceBinding';
import { deleteBuildConfig } from '../actions/buildConfigs';

class DeleteItemButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  triggerDeletion = history => {
    const { itemType, itemName, navigate } = this.props;
    switch (itemType) {
      case 'app':
        this.props.deleteApp(itemName);
        break;
      case 'buildconfig':
        this.props.deleteBuildConfig(itemName);
        break;
      case 'serviceBinding':
        this.props.deleteBinding(itemName);
        break;
      default:
        break;
    }
    // This ensure hiding the dropdown menu when deletion was not successful
    // See https://github.com/react-bootstrap/react-bootstrap/issues/541
    document.dispatchEvent(new MouseEvent('click'));
    navigate && history.replace(navigate);
  };

  openDialog = () => {
    this.setState({
      showModal: true
    });
  };

  handleDialogClose = () => {
    this.setState({
      showModal: false
    });
  };

  getItemName() {
    return this.props.item ? this.props.item.spec.name : this.props.itemName;
  }

  render() {
    const { itemType } = this.props;
    const itemName = this.getItemName();

    return (
      <Route
        render={props => (
          <React.Fragment>
            <MenuItem onClick={this.openDialog}>Delete</MenuItem>
            <MessageDialog
              show={this.state.showModal}
              onHide={this.handleDialogClose}
              primaryAction={() => this.triggerDeletion(props.history)}
              secondaryAction={this.handleDialogClose}
              primaryActionButtonContent="Delete"
              secondaryActionButtonContent="Cancel"
              primaryActionButtonBsStyle="danger"
              title="Confirm Delete"
              secondaryContent={
                <React.Fragment>
                  <p>
                    {`Are you sure you want to delete the ${itemType} '`}
                    <b>{itemName}</b>
                    {`'?`}
                  </p>
                  <p>
                    {itemName} and its data will no longer be available. <b>It cannot be undone.</b> Make sure this is
                    something you really want to do!
                  </p>
                </React.Fragment>
              }
            />
          </React.Fragment>
        )}
      />
    );
  }
}

const mapDispatchToProps = {
  deleteApp,
  deleteBuildConfig,
  deleteBinding
};

export default connect(
  null,
  mapDispatchToProps
)(DeleteItemButton);

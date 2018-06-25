import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ValidatedEditProfile from './EditProfile';

const styles = (theme) => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  modalDetail: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export class UserDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
    };
  }

  openEditModal = () => {
    this.setState({ showEditModal: true });
  }

  closeEditModal = () => {
    this.setState({ showEditModal: false }, () => console.log(this.state.showEditModal));
  }

  render() {
    const { onClose, classes, open, userDetail } = this.props;
    const { accountNo, customerId } = userDetail;
    return (
      <div className="detail-modal-container">
        <Modal
          disableBackdropClick
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={onClose}
          className={classes.modalDetail}
        >
          <div className={classes.paper}>
            <Typography variant="title" id="modal-title">
              User Detail Modal
          </Typography>
            <Typography variant="subheading" id="simple-modal-description">
            </Typography>
            <Button onClick={this.openEditModal}>Modify</Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </Modal>
        {this.state.showEditModal &&
          <ValidatedEditProfile
            open={this.state.showEditModal}
            onClose={this.closeEditModal}
            className={classes.modalDetail}
            userDetail={userDetail}
          />
        }
      </div>
    );
  }
}

UserDetailsModal.propTypes = {
  dispatch: PropTypes.func,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  userDetail: PropTypes.object,
  open: PropTypes.bool,
};

export default withStyles(styles)(UserDetailsModal);

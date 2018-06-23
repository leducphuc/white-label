import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
    };
  }

  render() {
    const { onClose, classes, open, userDetail } = this.props;
    const { accountNo, customerId } = userDetail;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
        className={classes.modalDetail}
      >
        <div className={classes.paper}>
          <Typography variant="title" id="modal-title">
            Edit User Profile
          </Typography>
          <div className="edit-form">
          </div>
          <Button>Save</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </Modal>
    );
  }
}

EditProfile.propTypes = {
  dispatch: PropTypes.func,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  userDetail: PropTypes.object,
  open: PropTypes.bool,
};

export default withStyles(styles)(EditProfile);

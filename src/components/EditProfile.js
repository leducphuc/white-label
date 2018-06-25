import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Datetime from 'react-datetime';
import validation from 'react-validation-mixin';
import strategy from 'joi-browser-validation-strategy';
import { UserProfileValidator } from '../constants';
import { USER_LIST_DATA } from '../constants';

import dayjs from 'dayjs';

const styles = (theme) => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50 + 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  modalDetail: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  datepickerContainer: {
    width: 200,
    display: 'inline-block',
  },
  editFieldLeft: {
    paddingRight: 50
  },
  buttonBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
    top: 32,
  },
  saveButton: {
    color: '#70efde',
  }
});

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      dob: '',
      fullName: '',
      copyDob: '',
      address: '',
      email: '',
      telephone: '',
      partnerAccount: '',
    };
    this.validatorTypes = { ...UserProfileValidator };
    this.editFields = USER_LIST_DATA.filter(user => user.editable);
  }

  componentWillMount() {
    const { userDetail } = this.props;
    const { dob, fullName, address, email, telephone, partnerAccount } = userDetail;
    const formatedDay = dayjs(dob).format('DD/MM/YYYY')
    this.setState({
      dob: formatedDay,
      fullName,
      address,
      email,
      telephone,
      partnerAccount,
    })
  }

  getValidatorData() {
    return this.state;
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value }, () => {
      this.props.validate(field);
    });
  }

  handleDateChange = (e) => {
    const value = e.target.value;
    let newValue = value;
    if (value.length === 2 || value.length === 5) {
      if ((/^(0[1-9]|[12][0-9]|3[01])/).test(newValue) ||
        (/^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])/).test(newValue)) {
        newValue += '/';
      }

    }
    this.setState({ dob: newValue }, () => this.props.validate('dob'));
  }

  renderDatePickerInput = (props, openCalendar) => {
    const { dob } = this.state;
    return (
      <TextField
        required
        label="Birthday"
        value={dob}
        margin="normal"
        onFocus={openCalendar}
        onChange={(e) => this.handleChange('dob', e.target.value)}
        onBlur={(e) => this.handleChange('dob', e.target.value)}
        error={this.props.getValidationMessages('dob')[0]}
        helperText={this.props.getValidationMessages('dob')[0] || 'Birthday format DD/MM/YYYY'}
      />
    )
  }

  render() {
    const { onClose, classes, open, userDetail } = this.props;
    const { accountNo, customerId } = userDetail;
    const { dob } = this.state;
    console.log(this.props);
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
            {
              this.editFields.map((item, index) =>
                <TextField
                  required
                  error={this.props.getValidationMessages(item.value)[0]}
                  helperText={this.props.getValidationMessages(item.value)[0]}
                  className={index % 2 === 0 ? classes.editFieldLeft : classes.editFieldRight}
                  key={item.value}
                  label={item.title}
                  margin="normal"
                  defaultValue={this.state[item.value]}
                  onBlur={(e) => this.handleChange(item.value, e.target.value)}
                />
              )
            }
            <div className={classes.datepickerContainer}>
              <Datetime
                value={dob}
                dateFormat="DD/MM/YYYY"
                timeFormat={false}
                renderInput={this.renderDatePickerInput}
              />
            </div>
          </div>
          <div className={classes.buttonBar}>
            <Button className={classes.saveButton}>Save</Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
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
  errors: PropTypes.object,
  getValidationMessages: PropTypes.func,
  validate: PropTypes.func,
};

const ValidatedEditProfile = validation(strategy)(EditProfile);
export default withStyles(styles)(ValidatedEditProfile);


import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { userList } from '../redux/actions';

export class UserList extends React.Component {

  componentDidMount() {
    this.props.dispatch(userList.fetch());
  }

  render() {
    console.log('render');
    return (
      <div>
        hello world
      </div>
    );
  }
}

UserList.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return { };
}

export default connect( mapStateToProps)(UserList);

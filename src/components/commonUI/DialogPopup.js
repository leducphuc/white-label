import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export class DialogPopup extends React.Component {
  componentDidMount() {
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

DialogPopup.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    dialogPopupStore: state.dialogPopupStore,
  };
}

export default connect(mapStateToProps)(DialogPopup);

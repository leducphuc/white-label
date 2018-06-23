import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export class FilterInput extends React.Component {

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isClear !== nextProps.isClear) this.onClear();
  }

  onClear = () => {
    console.log(this.fv.value);
    this.fv.value = '';
  }

  render() {
    const { label, onBlur, onKeyUp, fieldName  } = this.props;
    const inputStyle = {
      fontSize: 50,
    }
    return (
      <TextField
        label={label}
        type="search"
        margin="normal"
        inputRef={el => this.fv = el}
        onBlur={(e) => onBlur(fieldName, e.target.value)}
        onKeyUp={(e) => onKeyUp(fieldName, e)}
      />
    );
  }
}

FilterInput.propTypes = {
  dispatch: PropTypes.func,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  fieldName: PropTypes.string,
  isClear: PropTypes.number,
};

export default FilterInput;

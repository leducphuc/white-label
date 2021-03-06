import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { userList } from '../redux/actions';
import { USER_LIST_DATA, WINDOW_HEIGHT } from '../constants';
import FilterInput from './FilterInput';
import UserDetailsModal from './UserDetail';
import dayjs from 'dayjs';

const styles = theme => {
  return ({
    head: {
      backgroundColor: "#eee",
      position: "sticky",
      top: 0,
      zIndex: 10,
    },
    fullname: {
      maxWidth: 140,
      overflow: 'hidden',
    },
    username: {
      maxWidth: 140,
      overflow: 'hidden',
    },
    // searchFieldCell: {
    //   paddingRight: 0,
    //   paddingLeft: 0,
    //   marginRight: 5,
    //   maxWidth: 103,
    // },
    searchIcon: {
      // position: 'relative',
      // paddingBottom: 0,
      // top: 15,
      // paddingRight: 0,
      cursor: 'pointer',
    },
    userTableContainer: {
      maxHeight: WINDOW_HEIGHT - 81 - 40,
      overflow: 'auto'
    },
    filterContainer: {
      marginBottom: 5,
    }
  })
};

export class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clickedItem: null,
      userDetail: null,
      accountNo: '',
      customerId: '',
      fullName: '',
      userName: '',
      email: '',
      page: 0,
      size: 100,
      orderBy: 'null',
      isAsc: false,
      showDetailModal: false,
    };
    this.tableHeader = USER_LIST_DATA.filter(user => user.showInTable).map(item => item.title);
    this.searchField = USER_LIST_DATA.filter(item => item.searchField);
    this.textInput = React.createRef();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.userList !== nextProps.userList) return true;
  //   if (this.state.clickedItem !== nextState.clickedItem) return true;
  //   return false;
  // }

  componentDidMount() {
    this.handleFilter();
  }

  handleBlur = (field, value) => {
    this.setState({ [field]: value }, () => this.handleFilter());
  }

  handleFilter = () => {
    const { accountNo, customerId, fullName, userName, email, page, size } = this.state;
    const filter = {
      accountNo,
      customerId,
      fullName,
      userName,
      email
    }
    this.props.dispatch(userList.fetch(filter, page, size));
  }

  handlePressEnter = (field, e) => {
    if (e.keyCode === 13) {
      this.setState({ [field]: e.target.value }, () => this.handleFilter());
    }
  }

  handleClickRow = (user) => {
    const { accountNo } = user;
    const { clickedItem } = this.state;
    if (clickedItem === accountNo) this.openDetailModal();
    else {
      this.setState({ clickedItem: accountNo, userDetail: user });
    }
  }

  handleClear = () => {
    this.setState({
      accountNo: null,
      customerId: null,
      fullName: null,
      userName: null,
      email: null,
      isClear: this.state.isClear + 1,
    }, () => this.handleFilter());
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  }

  handleSort = (item) => {
    const { orderBy, isAsc } = this.state;
    const asc = orderBy === item ? !isAsc : false;
    this.setState({
      orderBy: item,
      isAsc: asc,
    }, () => this.props.dispatch(userList.sort({ filter: item, isAsc })));
  }

  openDetailModal = () => {
    this.setState({ showDetailModal: true });
  }

  closeDetailModal = () => {
    this.setState({ showDetailModal: false });
  }

  render() {
    const { userList, classes } = this.props;
    const { clickedItem, isClear, isAsc, orderBy } = this.state;
    const direction = isAsc ? 'asc' : 'desc';

    return (
      <Paper className={classes.userListContainer}>
        <Paper className={classes.filterContainer}>

          <Grid container spacing={24}>
            <Grid className={classes.searchIcon} item xs={1}>
              <img src={require('../styles/icons/baseline_search_black_18dp.png')} />
            </Grid>
            {
              this.searchField.map((item) =>
                <Grid
                  item xs
                  key={item.value}
                  className={classes.searchFieldCell}
                >
                  <FilterInput
                    label={item.title}
                    fieldName={item.value}
                    onBlur={this.handleBlur}
                    onKeyUp={this.handlePressEnter}
                    isClear={isClear}
                  />
                </Grid>
              )
            }
            <Grid className={classes.searchIcon} item xs={1}>
              <img src={require('../styles/icons/baseline_clear_black_18dp.png')} />
            </Grid>
          </Grid>

        </Paper>
        <Paper className={classes.userTableContainer}>
          <Table className={classes.userListTable}>
            <TableHead>
              <TableRow>
                {
                  this.tableHeader.map((item, index) =>
                    <TableCell
                      className={classes.head}
                      key={index}
                    >
                      <TableSortLabel
                        active={orderBy === item}
                        direction={direction}
                        onClick={() => this.handleSort(item)}
                      >
                        {item}
                      </TableSortLabel>
                    </TableCell>
                  )
                }
              </TableRow>
            </TableHead>
            <TableBody className="table-user-body">
              {userList.length !== 0 && userList.map(user => {
                return (
                  <TableRow
                    key={user.accountNo}
                    onClick={() => this.handleClickRow(user)}
                    className={user.accountNo === clickedItem ? 'clicked-item' : ''}
                  >
                    <TableCell component="th" scope="row">
                      {user.accountNo}
                    </TableCell>
                    <TableCell>
                      {user.customerId}
                    </TableCell>
                    <TableCell className={classes.fullname}>{user.fullName}</TableCell>
                    <TableCell className={classes.username}>{user.userName}</TableCell>
                    <TableCell>{user.telephone}</TableCell>
                    <TableCell>{user.activeStatus}</TableCell>
                    <TableCell>{dayjs(user.createdDate).format('DD/MM/YYYY')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        {this.state.showDetailModal &&
          <UserDetailsModal
            onClose={this.closeDetailModal}
            userDetail={this.state.userDetail}
            open={this.state.showDetailModal}
          />
        }

      </Paper>
    );
  }
}

UserList.propTypes = {
  dispatch: PropTypes.func,
  userList: PropTypes.array,
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    userList: state.userListStore.userList
  };
}

export default withStyles(styles)(connect(mapStateToProps)(UserList));

import React, {Component} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    minWidth: 700,
  },
  paper: {
    position: 'absolute',
    width: 'auto',
    outline: 'none',
    padding: theme.spacing.unit * 2,
    boxSizing: 'border-box',
    '& .inner': {
      border: 'none !important',
      boxShadow: 'none !important',
    },
  },
  modal_main: {
    display: 'inline-block',
    verticalAlign: 'top',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    '& .inner': {
      border: 'none !important',
      boxShadow: 'none !important',
    },
  },
  modal_actions: {
    position: 'absolute',
    top: theme.spacing.unit * 2,
    left: '100%',
    verticalAlign: 'top',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
    boxShadow: theme.shadows[5],
    width: 150,
  },
  button: {
    width: '100%',
  },
  input: {
    display: 'none',
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const th_rows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Customer' },
  { id: 'created', numeric: true, disablePadding: false, label: 'Date' },
  { id: 'quantity', numeric: true, disablePadding: false, label: '# of items' },
  { id: 'total_value', numeric: true, disablePadding: false, label: 'Total $' },
  { id: 'paid', numeric: true, disablePadding: false, label: 'Paid' },
];

class EnhancedTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {th_rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

class OrderTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      order: 'asc',
      orderBy: 'created',
      modalOrderID: null,
      modalOpen: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleRequestSort(event, property) {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleClick(event, id) {
    this.props.handleGetOrderReceipt(id);

    this.setState({
      modalOrderID: id,
      modalOpen: true,
    });
  };

  handleTabChange(event, value) {
    this.setState({ value });
  };

  handleClose() {
    this.setState({
      modalOrderID: null,
      modalOpen: false,
    });
  };

  render() {
    const { classes, data, handleOrderStatus, handleOrderPaid } = this.props;
    const { value, order, orderBy, modalOpen, modalOrderID } = this.state;

    this.status_0 = data.filter(order => (order.status === "sent" || order.status === "sent_reqPayment"));
    this.status_1 = data.filter(order => (order.status === "processing"));
    this.status_2 = data.filter(order => (order.status === "ready"));
    this.status_3 = data.filter(order => (order.status === "complete"));
    this.status_4 = data.filter(order => (order.status === "cancelled"));

    let label_0 = "Received ("+this.status_0.length+")";
    let label_1 = "Processing ("+this.status_1.length+")";
    let label_2 = "Ready ("+this.status_2.length+")";
    let label_3 = "Completed ("+this.status_3.length+")";
    let label_4 = "Cancelled ("+this.status_4.length+")";

    let orders = this["status_"+value];

    let modalReceipt = null;
    let modalStatus = null;
    let modalPaid = false;
    if (modalOrderID) {
      modalPaid = data.filter(order => (order.id === modalOrderID))[0].paid;
      modalStatus = data.filter(order => (order.id === modalOrderID))[0].status;
      modalReceipt = data.filter(order => (order.id === modalOrderID))[0].receipt;
    }
    // console.log(modalOrderID, modalReceipt);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleTabChange}>
            <Tab label={label_0} />
            <Tab label={label_1} />
            <Tab label={label_2} />
            <Tab label={label_3} />
            <Tab label={label_4} />
          </Tabs>
        </AppBar>
        <Table className={classes.table}>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>
            {stableSort(orders, getSorting(order, orderBy))
              .map(row => {
                return (row !== false &&
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, row.id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right"><Moment format="YYYY/MM/DD HH:mm">{row.created*1000}</Moment></TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{Number(row.total_value).toFixed(2)}</TableCell>
                    <TableCell align="right">{(row.paid === 1) ? "Yes" : "No"}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <Modal
          open={modalOpen}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            {!modalReceipt && <div className={classes.modal_main}>Loading...</div>}
            {modalReceipt && <div className={classes.modal_main} dangerouslySetInnerHTML={{__html: modalReceipt}}></div>}
            {(modalStatus !== "complete") &&
              <div className={classes.modal_actions}>
                {(modalStatus === "sent" || modalStatus === "sent_reqPayment") &&
                  <div>
                    <Button color="primary" className={classes.button} onClick={(e) => handleOrderStatus(modalOrderID, "processing")}>
                      Confirm Order
                    </Button><br />
                    <Button color="secondary" className={classes.button} onClick={(e) => handleOrderStatus(modalOrderID, "cancelled")}>
                      Cancel Order
                    </Button>
                  </div>
                }
                {modalStatus === "processing" &&
                  <div>
                    <Button color="primary" className={classes.button} onClick={(e) => handleOrderStatus(modalOrderID, "ready")}>
                      Order is ready for pick-up
                    </Button><br />
                    <Button color="secondary" className={classes.button} onClick={(e) => handleOrderStatus(modalOrderID, "sent")}>
                      Unconfirm Order
                    </Button>
                  </div>
                }
                {modalStatus === "ready" &&
                  <div>
                    <Button color="primary" className={classes.button} onClick={(e) => handleOrderStatus(modalOrderID, "complete")}>
                      Order has been picked up
                    </Button><br />
                    <Button color="secondary" className={classes.button} onClick={(e) => handleOrderStatus(modalOrderID, "processing")}>
                      Order is not ready yet
                    </Button>
                  </div>
                }
                {modalStatus === "cancelled" &&
                  <div>
                    <Button color="primary" className={classes.button} onClick={(e) => handleOrderStatus(modalOrderID, "sent")}>
                      Uncancel Order
                    </Button>
                  </div>
                }
                {modalPaid === 0 &&
                  <Button color="default" className={classes.button} onClick={(e) => handleOrderPaid(modalOrderID)}>
                    Mark as Paid
                  </Button>
                }
              </div>
            }
          </div>
        </Modal>
      </div>
    );
  }
}

OrderTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderTabs);

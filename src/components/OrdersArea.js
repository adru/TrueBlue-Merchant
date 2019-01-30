import React, {Component} from 'react';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import OrderTabs from './OrderTabs';

const styles = theme => ({
});

class OrdersArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { location, handleGetOrders } = this.props;
    handleGetOrders(location.id);
  }

  componentDidUpdate() {
  }

  render() {
    const { data } = this.props;

    if (!data.orderData) {
      return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
          Loading orders...
        </Typography>
      );
    } else {
      let orders = data.orderData;//.sort((a, b) => b.created - a.created);
      for (let a = 0; a < orders.length; a++) {
        let orderJSON = JSON.parse(orders[a].json_obj);
        orders[a].quantity = orderJSON.quantity;
      }

      return (
        <OrderTabs
          data={orders}
          handleGetOrderReceipt={this.props.handleGetOrderReceipt}
          handleOrderStatus={this.props.handleOrderStatus}
          handleOrderPaid={this.props.handleOrderPaid}
        />
      );
    }
  }
}

OrdersArea.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OrdersArea);

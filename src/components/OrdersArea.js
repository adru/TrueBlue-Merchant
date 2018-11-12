import React, {Component} from 'react';

import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
});

class OrdersArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    const { classes, location } = this.props;

    return (
      <div>
        Orders Area
      </div>
    );
  }
}

OrdersArea.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OrdersArea);

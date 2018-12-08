import React, {Component} from 'react';
import QRCode from 'qrcode-react';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  qrWrapper: {
    padding: 20,
    textAlign: 'center',
    margin: 20,
    '& canvas': {
      width: '50% !important',
      height: 'auto !important',
      minWidth: 240,
      maxWidth: 400
    }
  }
});

class PointsArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      location_token: null,
      unique: false
    };

    this.updateStateGetQR = this.updateStateGetQR.bind(this);
  }

  componentDidMount() {
    this.updateStateGetQR();
  }

  componentDidUpdate() {
    // console.log("did update");
    if (this.props.location.location_token !== this.state.location_token) {
      this.updateStateGetQR();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log("nextProps", nextProps, this.props);
    // console.log("nextState", nextState, this.state);
    // console.log("state.location token same?", this.state.location_token === nextState.location_token);
    // console.log("displayQR the same?", this.props.data.displayQR === nextProps.data.displayQR);
    // console.log("props.location_token the same?", this.props.location.location_token === nextProps.location.location_token);
    // console.log("props.location_token the same as state.location_token?", this.props.location.location_token === this.state.location_token);
    return this.state.location_token !== nextState.location_token || this.props.data.displayQR !== nextProps.data.displayQR || this.props.location.location_token === this.state.location_token;
  }

  updateStateGetQR() {
    this.setState({
      location_token: this.props.location.location_token
    }, function() {
      this.props.getQR(this.state);
    });
  }

  render() {
    const { classes, data } = this.props;
    const { quantity } = this.state;
    const downloadQRBase = "http://trueblue.guru/redirect.php?id="+data.clientData.id+"&e=";

    if (data.displayQR) {
      return (
        <div>
          <Paper title={downloadQRBase+data.displayQR.code} className={classes.qrWrapper}>
            <Typography color="textSecondary" variant="h6">
              {quantity} Point(s)
            </Typography>
            <QRCode
              value={downloadQRBase+data.displayQR.code}
              size={400}
              logo={data.clientData.client_icon}
            />
          </Paper>
        </div>
      )
    } else {
      return (
        <div>
          Loading QR Code...
        </div>
      );
    }
  }
}

PointsArea.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PointsArea);

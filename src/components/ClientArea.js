import React, {Component} from 'react';
import QrReader from "react-qr-reader";

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import UserArea from './UserArea';
import PointsArea from './PointsArea';
import RewardsArea from './RewardsArea';
import OrdersArea from './OrdersArea';

let this_;

const styles = theme => ({
  height100: {
    height: '100%',
  },
  formControl: {
    margin: theme.spacing.unit,
    flexGrow: 1,
    color: '#FFF'
  },
  instructions: {
    background: '#333 !important',
    color: '#FFF',
    height: 10,
    fontSize: 14,
    opacity: 1
  },
  leftBar: {
    flexGrow: 1
  },
  qrScanner: {
    width: '100%',
    '& section': {
      paddingTop: 'calc(100vh - 60px) !important'
    }
  },
  fullscreen: {
    height: '100%',
    height: 'calc(100vh - 60px) !important',
    textAlign: 'center'
  },
  focusVisible: {},
  largeIcon: {
    padding: '20px 0',
    '& .fa-lg': {
      fontSize: 50,
    }
  },
  buttonBase: {
    verticalAlign: 'top',
    display: 'inline-block',
    width: 200,
    '& i': {
      padding: '10px auto'
    }
  },
  selectedButton: {
    background: 'rgba(0,0,0,0.5)'
  },
  page: {
    minHeight: 'calc(100vh - 64px)',
    boxSizing: 'border-box'
  }
});

const initialState = {
  locationsOpen: false,
  selectedLocation: "",
  userApiKey: null,
  showArea: "",
  dialogOpen: false,
  resetQROpen: false,
};

class ClientArea extends Component {
  constructor(props) {
    super(props);

    this_ = this;
    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.clearLocation = this.clearLocation.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.showThisArea = this.showThisArea.bind(this);
    this.gotoSettings = this.gotoSettings.bind(this);
    this.scanQR = this.scanQR.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleConfirmDialog = this.handleConfirmDialog.bind(this);
    this.continueScan = this.continueScan.bind(this);
    this.openResetQR = this.openResetQR.bind(this);
    this.closeResetQR = this.closeResetQR.bind(this);
    this.confirmResetQR = this.confirmResetQR.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('selectedLocation')) {
      this.setState({ selectedLocation: parseInt(localStorage.getItem('selectedLocation')) }, function() { console.log(this_.state); });
    } else if (this.props.data.clientData.locations) {
      if (this.props.data.clientData.locations.length === 1) {
        localStorage.setItem('selectedLocation', this.props.data.clientData.locations[0].id);
        this.setState({
          selectedLocation: parseInt(this.props.data.clientData.locations[0].id)
        }, function() { console.log(this_.state); })
      } else {
        this.setState({
          locationsOpen: true
        })
      }
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, function() {
      if (event.target.name === "selectedLocation") {
        localStorage.setItem('selectedLocation', event.target.value);
      }
    });
  };

  handleClose() {
    this.setState({ locationsOpen: false });
  };

  handleOpen() {
    this.setState({ locationsOpen: true });
  };

  clearLocation() {
    this.setState({ selectedLocation: "" });
  }

  handleLogout() {
    this.setState(initialState, function() {
      this.props.handleLogout();
    })
  }

  showThisArea(area) {
    this.props.getQR("clear");
    if (this.state.showArea !== area) {
      this.setState({ showArea: area });
    } else {
      this.setState({ showArea: "" });
    }
  }

  handleScan(data) {
    if (data) {
      this.setState({
        showArea: "",
        userApiKey: data
      }, function() {
        this.props.handleGetUser(this.state.userApiKey)
      });
    }
  }

  handleError(err) {
    console.error(err);
  }

  gotoSettings() {
    /*eslint-disable no-undef*/
    cordova.plugins.diagnostic.switchToSettings(function(){
      console.log("Successfully switched to Settings app");
    }, function(error){
      this.props.handleSnackbar("Error: "+error, "error");
    });
    /*eslint-enable no-undef*/
  }

  scanQR() {
    //   this.setState({ userApiKey: "e0cb2b75f0dffda6d6f67c8bb1ae644b" }, function() {
    //     this.props.handleGetUser(this.state.userApiKey)
    //   });

    /*eslint-disable no-undef*/
    cordova.plugins.diagnostic.requestCameraAuthorization(function(granted) {
      if (granted === true || granted === "GRANTED" || granted === "authorized" || granted === cordova.plugins.diagnostic.permissionStatus.GRANTED) {
        this_.continueScan();
      } else if (granted === false || granted === "DENIED" || granted === cordova.plugins.diagnostic.permissionStatus.DENIED) {
        this_.setState({ dialogOpen: true });
      } else {
        this_.props.handleSnackbar("Error: To complete this action, please allow access to the camera and storage in your settings.", "error");
      }
    }, function(error) {
      this_.props.handleSnackbar("Error: "+error, "error");
    });
    /*eslint-enable no-undef*/
  }

  handleCloseDialog() {
    this.setState({ dialogOpen: false });
  }

  handleConfirmDialog() {
    this.gotoSettings();
  }

  continueScan() {
    /*eslint-disable no-undef*/
    cordova.plugins.barcodeScanner.scan(function (result) {
      if (!result.cancelled){
        this_.handleScan(result.text);
      }
    }, function (error) {
      this_.props.handleSnackbar("Error: Scanning failed!", "error");
    });
    /*eslint-enable no-undef*/
  }

  openResetQR() {
    this.setState({ resetQROpen: true });
  }
  closeResetQR() {
    this.setState({ resetQROpen: false });
  }
  confirmResetQR() {
    const { data } = this.props;
    const { selectedLocation } = this.state;
    // const locationObj = (selectedLocation !== "") ? data.clientData.locations.filter(function(location) { return location.id === selectedLocation; }) : null;
    const locationObj = (selectedLocation !== "") ? data.clientData.locations.filter(location => (location.id === parseInt(selectedLocation,0))[0]) : null;

    if (selectedLocation && locationObj) {
      this.props.handleResetQR(locationObj.id);
    } else {
      this.props.handleSnackbar("Error: A location is required.", "error");
    }

    this.closeResetQR();
  }

  render() {
    const { classes, data, getQR } = this.props;
    const { locationsOpen, dialogOpen, resetQROpen, selectedLocation, showArea } = this.state;
    // const locationObj = (selectedLocation !== "") ? data.clientData.locations.filter(function(location) { return location.id === selectedLocation; }) : null;
    const locationObj = (selectedLocation !== "") ? data.clientData.locations.filter(location => (location.id === parseInt(selectedLocation,0)))[0] : null;
    const scanUserQR = (data.clientData && data.clientData.client_mode === "merchant");
    const seeOrders = (locationObj && locationObj.cart_email);
    const scanRewardQR = (!scanUserQR && data.rewardData && data.rewardData.length);
    const merchantPage = (data.merchantPageData && data.merchantPageData[0]) ? true : false;
    const alwaysShowMerchantPage = (data.merchantPageData && data.merchantPageData[0] && ((data.merchantPageData[0].icon).includes('left') || (data.merchantPageData[0].icon).includes('right'))) ? true : false;
    let actuallyShowThisArea = (data.userData) ? "userArea" : showArea;
    actuallyShowThisArea = (alwaysShowMerchantPage && !actuallyShowThisArea) ? "pointsQR" : actuallyShowThisArea;

    return (
      <div className={classes.height100}>
        <Dialog
          maxWidth="xs"
          aria-labelledby="confirmation-dialog-title"
          open={dialogOpen}
        >
          <DialogTitle id="confirmation-dialog-title">Permissions Error</DialogTitle>
          <DialogContent>
            To complete this action, please allow access to the camera and storage in your settings.
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              Nevermind
            </Button>
            <Button onClick={this.handleConfirmDialog} color="primary">
              Go to Settings
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          maxWidth="xs"
          aria-labelledby="reset-qr-dialog-title"
          open={resetQROpen}
        >
          <DialogTitle id="confirmation-dialog-title">Reset QR Codes</DialogTitle>
          <DialogContent>
            Are you sure you want to reset all of your QR codes?
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeResetQR} color="primary">
              Nevermind
            </Button>
            <Button onClick={this.confirmResetQR} color="primary">
              Yes, Reset them
            </Button>
          </DialogActions>
        </Dialog>
        {data.clientData.client_css && <style>{data.clientData.client_css}</style>}
        {!locationObj &&
          <AppBar position="static" color="primary" className="appBar">
            <Toolbar>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="location-select">Select a location</InputLabel>
                <Select
                  open={locationsOpen}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  value={selectedLocation}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'selectedLocation',
                    id: 'location-select',
                  }}
                >
                  <MenuItem className={classes.instructions} value="" disabled={true}>Select a location:</MenuItem>
                  {data.clientData.locations.map(loc => (
                    <MenuItem value={loc.id} key={loc.id}>
                      <span dangerouslySetInnerHTML={{__html: loc.location_name}} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Tooltip title="Logout">
                <IconButton color="inherit" aria-label="Logout" onClick={this.handleLogout}>
                  <i className="fas fa-sign-out"></i>
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
        }
        {selectedLocation && locationObj &&
          <AppBar position="static" color="primary" className="appBar">
            <Toolbar>
              {data.clientData.locations && data.clientData.locations.length > 1 &&
                <Tooltip title="Select a new location">
                  <IconButton color="inherit" aria-label="Select a new location" onClick={this.clearLocation}>
                    <i className="fas fa-building"></i>
                  </IconButton>
                </Tooltip>
              }
              <Typography variant="h5" color="inherit" className={classes.leftBar}>
                <span dangerouslySetInnerHTML={{__html: locationObj.location_name}} />
              </Typography>
              {scanUserQR &&
                <Tooltip title="Scan a User QR Code">
                  <IconButton className={(actuallyShowThisArea === "qrScanner" || actuallyShowThisArea === "userArea") ? classes.selectedButton : ""} color="inherit" aria-label="Scan a User QR Code" onClick={this.scanQR}>
                    <i className="fas fa-user"></i>
                  </IconButton>
                </Tooltip>
              }
              {!scanUserQR &&
                <Tooltip title="Reset QR Codes">
                  <IconButton color="inherit" aria-label="Show Point QR Code" onClick={(e) => this.openResetQR()}>
                    <i className="fas fa-sync"></i>
                  </IconButton>
                </Tooltip>
              }
              {!scanUserQR &&
                <Tooltip title="Show Point QR Code">
                  <IconButton className={(actuallyShowThisArea === "pointsQR") ? classes.selectedButton : ""} color="inherit" aria-label="Show Point QR Code" onClick={(e) => this.showThisArea("pointsQR")}>
                    <i className="fas fa-coins"></i>
                  </IconButton>
                </Tooltip>
              }
              {scanRewardQR &&
                <Tooltip title="Show Reward QR Code">
                  <IconButton className={(actuallyShowThisArea === "rewardsQR") ? classes.selectedButton : ""} color="inherit" aria-label="Show Reward QR Code" onClick={(e) => this.showThisArea("rewardsQR")}>
                    <i className="fas fa-stars"></i>
                  </IconButton>
                </Tooltip>
              }
              {seeOrders &&
                <Tooltip title="Orders">
                  <IconButton className={(actuallyShowThisArea === "ordersArea") ? classes.selectedButton : ""} color="inherit" aria-label="Orders" onClick={(e) => this.showThisArea("ordersArea")}>
                    <i className="fas fa-receipt"></i>
                  </IconButton>
                </Tooltip>
              }
              <Tooltip title="Logout">
                <IconButton color="inherit" aria-label="Logout" onClick={this.handleLogout}>
                  <i className="fas fa-sign-out"></i>
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
        }
        {locationObj && (actuallyShowThisArea === "" || alwaysShowMerchantPage) && !merchantPage &&
          <div className={classes.fullscreen}>
            <div className="verticallyCenter">
              {scanUserQR &&
                <ButtonBase
                  focusRipple
                  focusVisibleClassName={classes.focusVisible}
                  onClick={this.scanQR}
                  className={classes.buttonBase}
                >
                  <div className={classes.largeIcon}><i className="fas fa-user fa-lg"></i></div>
                  <Typography variant="h6" color="inherit">
                    Scan User QR Code
                  </Typography>
                </ButtonBase>
              }
              {!scanUserQR &&
                <ButtonBase
                  focusRipple
                  focusVisibleClassName={classes.focusVisible}
                  onClick={(e) => this.showThisArea("pointsQR")}
                  className={classes.buttonBase}
                >
                  <div className={classes.largeIcon}><i className="fas fa-coins fa-lg"></i></div>
                  <Typography variant="h6" color="inherit">
                    Point QR Code
                  </Typography>
                </ButtonBase>
              }
              {scanRewardQR &&
                <ButtonBase
                  focusRipple
                  focusVisibleClassName={classes.focusVisible}
                  onClick={(e) => this.showThisArea("rewardsQR")}
                  className={classes.buttonBase}
                >
                  <div className={classes.largeIcon}><i className="fas fa-stars fa-lg"></i></div>
                  <Typography variant="h6" color="inherit">
                    Reward QR Code
                  </Typography>
                </ButtonBase>
              }
              {seeOrders &&
                <ButtonBase
                  focusRipple
                  focusVisibleClassName={classes.focusVisible}
                  onClick={(e) => this.showThisArea("ordersArea")}
                  className={classes.buttonBase}
                >
                  <div className={classes.largeIcon}><i className="fas fa-receipt fa-lg"></i></div>
                  <Typography variant="h6" color="inherit">
                    Orders
                  </Typography>
                </ButtonBase>
              }
            </div>
          </div>
        }
        {(actuallyShowThisArea === "" || alwaysShowMerchantPage) && merchantPage &&
          <div className={data.merchantPageData[0].icon}>
            {data.merchantPageData[0].css &&
              <style>{data.merchantPageData[0].css}</style>
            }
            <div className={classes.page + " page"} dangerouslySetInnerHTML={{__html: data.merchantPageData[0].content}}></div>
          </div>
        }
        {actuallyShowThisArea === "qrScanner" && locationObj &&
          <QrReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
            className={classes.qrScanner}
          />
        }
        {actuallyShowThisArea === "pointsQR" && locationObj &&
          <PointsArea
            data={data}
            location={locationObj}
            getQR={getQR}
          />
        }
        {actuallyShowThisArea === "rewardsQR" && locationObj &&
          <RewardsArea
            data={data}
            location={locationObj}
            getQR={getQR}
          />
        }
        {actuallyShowThisArea === "ordersArea" && locationObj &&
          <OrdersArea
            data={data}
            orderData={data.orderData}
            location={locationObj}
            handleGetOrders={this.props.handleGetOrders}
            handleGetOrderReceipt={this.props.handleGetOrderReceipt}
            handleOrderStatus={this.props.handleOrderStatus}
            handleOrderPaid={this.props.handleOrderPaid}
          />
        }
        {actuallyShowThisArea === "userArea" && locationObj &&
          <UserArea
            data={data.userData}
            clientData={data.clientData}
            token={locationObj.location_token}
            handleManualScan={this.props.handleManualScan}
            handleManualClaim={this.props.handleManualClaim}
            handleVIPadd={this.props.handleVIPadd}
            handleVIPdelete={this.props.handleVIPdelete}
          />
        }
      </div>
    );
  }
}

ClientArea.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientArea);

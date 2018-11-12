import React, {Component} from 'react';
import QrReader from "react-qr-reader";

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import ButtonBase from '@material-ui/core/ButtonBase';

import UserArea from './UserArea';
import PointsArea from './PointsArea';
import RewardsArea from './RewardsArea';
import OrdersArea from './OrdersArea';

const styles = theme => ({
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

const ITEM_HEIGHT = 48;

const initialState = {
  locationsOpen: false,
  selectedLocation: "",
  userApiKey: null,
  showArea: "",
};

class ClientArea extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.clearLocation = this.clearLocation.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.showThisArea = this.showThisArea.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('selectedLocation')) {
      this.setState({ selectedLocation: parseInt(localStorage.getItem('selectedLocation')) });
    } else if (this.props.data.clientData.locations) {
      if (this.props.data.clientData.locations.length === 1) {
        localStorage.setItem('selectedLocation', this.props.data.clientData.locations[0].id);
        this.setState({
          selectedLocation: parseInt(this.props.data.clientData.locations[0].id)
        })
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
    // if (area === "qrScanner") {
    //   this.setState({ userApiKey: "bee7c292dfbd275df48576c14464974e" }, function() {
    //     this.props.handleGetUser(this.state.userApiKey)
    //   });
    // } else
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

  render() {
    const { classes, data, getQR } = this.props;
    const { locationsOpen, selectedLocation, showArea } = this.state;
    const locationObj = (selectedLocation !== "") ? data.clientData.locations.filter(function(location) { return location.id === selectedLocation; }) : null;
    const scanUserQR = (data.clientData && data.clientData.client_mode === "merchant");
    const seeOrders = (locationObj && locationObj[0] && locationObj[0].cart_email);
    const scanRewardQR = (!scanUserQR && data.rewardData && data.rewardData.length);
    const merchantPage = (data.merchantPageData && data.merchantPageData[0]) ? true : false;
    const alwaysShowMerchantPage = (data.merchantPageData && data.merchantPageData[0] && ((data.merchantPageData[0].icon).includes('left') || (data.merchantPageData[0].icon).includes('right'))) ? true : false;
    let actuallyShowThisArea = (data.userData) ? "userArea" : showArea;
    actuallyShowThisArea = (alwaysShowMerchantPage && !actuallyShowThisArea) ? "pointsQR" : actuallyShowThisArea;

    return (
      <div>
        {data.clientData.client_css && <style>{data.clientData.client_css}</style>}
        {(!selectedLocation || locationObj.length === 0) && data.clientData.locations && data.clientData.locations.length > 1 &&
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
        {selectedLocation && locationObj[0] &&
          <AppBar position="static" color="primary" className="appBar">
            <Toolbar>
              <Typography variant="h5" color="inherit" className={classes.leftBar}>
                <span dangerouslySetInnerHTML={{__html: locationObj[0].location_name}} />
              </Typography>
              {scanUserQR &&
                <Tooltip title="Scan a User QR Code">
                  <IconButton className={(actuallyShowThisArea === "qrScanner" || actuallyShowThisArea === "userArea") ? classes.selectedButton : ""} color="inherit" aria-label="Scan a User QR Code" onClick={(e) => this.showThisArea("qrScanner")}>
                    <i className="fas fa-user"></i>
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
              {data.clientData.locations && data.clientData.locations.length > 1 &&
                <Tooltip title="Select a new location">
                  <IconButton color="inherit" aria-label="Select a new location" onClick={this.clearLocation}>
                    <i className="fas fa-building"></i>
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
        {selectedLocation && locationObj[0] && (actuallyShowThisArea === "" || alwaysShowMerchantPage) && !merchantPage &&
          <div className={classes.fullscreen}>
            <div className="verticallyCenter">
              {scanUserQR &&
                <ButtonBase
                  focusRipple
                  focusVisibleClassName={classes.focusVisible}
                  onClick={(e) => this.showThisArea("qrScanner")}
                  className={classes.buttonBase}
                >
                  <div className={classes.largeIcon}><i className="fas fa-user fa-lg"></i></div>
                  <Typography variant="h6" color="inherit">
                    Show User QR Code
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
            <div className={classes.page + " " + "page"} dangerouslySetInnerHTML={{__html: data.merchantPageData[0].content}}></div>
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
            location={locationObj[0]}
            getQR={getQR}
          />
        }
        {actuallyShowThisArea === "rewardsQR" && locationObj &&
          <RewardsArea
            data={data}
            location={locationObj[0]}
            getQR={getQR}
          />
        }
        {actuallyShowThisArea === "ordersArea" && locationObj &&
          <OrdersArea
            data={data}
            location={locationObj[0]}
          />
        }
        {actuallyShowThisArea === "userArea" && locationObj &&
          <UserArea
            data={data.userData}
            clientData={data.clientData}
            token={locationObj[0].location_token}
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

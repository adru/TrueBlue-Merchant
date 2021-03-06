import 'core-js';
import "@babel/polyfill";

import React, {Component} from 'react';
import 'whatwg-fetch';

import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import LoginForm from './LoginForm';
import ClientArea from './ClientArea';

import '../css/index.css';
import '../css/all.min.css';

let this_;
// const apiBase = "http://localhost.trueblue.guru/api/v1.5/admin";
const apiBase = "http://live.trueblue.guru/application/v1.5/admin";

const initialState = {
  apiKey: null,
  adminData: null,
  clientData: null,
  userData: null,
  orderData: null,
  snackbarOpen: false,
  snackbarMessage: "",
  snackbarClass: "",
  merchantPageData: null,
  displayQR: null,
};

class App extends Component {
  constructor(props) {
    super(props);

    this_ = this;
    this.state = initialState;

    this.showSnackbar = this.showSnackbar.bind(this);
    this.hideSnackbar = this.hideSnackbar.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.adminLogin = this.adminLogin.bind(this);
    this.apiLogin = this.apiLogin.bind(this);
    this.getClient = this.getClient.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.getRewards = this.getRewards.bind(this);
    this.getMerchantPage = this.getMerchantPage.bind(this);
    this.getQR = this.getQR.bind(this);
    this.handleManualScan = this.handleManualScan.bind(this);
    this.handleManualClaim = this.handleManualClaim.bind(this);
    this.handleVIPadd = this.handleVIPadd.bind(this);
    this.handleVIPdelete = this.handleVIPdelete.bind(this);
    this.handleResetQR = this.handleResetQR.bind(this);
    this.getOrderReceipt = this.getOrderReceipt.bind(this);
    this.handleOrderStatus = this.handleOrderStatus.bind(this);
    this.handleOrderPaid = this.handleOrderPaid.bind(this);
  }

  showSnackbar(message, style) {
    this.setState({
      snackbarOpen: true,
      snackbarMessage: message,
      snackbarClass: style
    });
  }

  hideSnackbar() {
    this.setState({
      snackbarOpen: false,
      snackbarMessage: "",
      snackbarClass: ""
    });
  }

  handleLogout() {
    localStorage.removeItem('apiKey');
    localStorage.removeItem('selectedLocation');
    this.setState(initialState);
  }

  componentDidMount() {
    if (localStorage.getItem('apiKey')) {
      this_.setState({ apiKey: localStorage.getItem('apiKey') }, function() {
        this_.apiLogin({ api_key: this_.state.apiKey });
      });
    }
  }

  componentDidUpdate() {
  }

  adminLogin(data) {
    console.log("adminLogin", data, apiBase);
    fetch(apiBase+"/login", {
      method: "post",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: this.xwwwfurlenc(data)
    })
    .then(response => response.json())
    .then(function(adminData) {
      if (!adminData.error) {
        this_.setState({ adminData, apiKey: adminData.apiKey }, function() {
          localStorage.setItem('apiKey', this_.state.apiKey);
          this_.getClient(this_.state.adminData.client_id);
        });
      } else {
        this_.showSnackbar("Error: "+adminData.message, "error");
      }
    });
  }

  apiLogin(data) {
    fetch(apiBase+"/api_login", {
      method: "post",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: this.xwwwfurlenc(data)
    })
    .then(response => response.json())
    .then(function(adminData) {
      if (!adminData.error) {
        this_.setState({ adminData, apiKey: adminData.apiKey }, function() {
          this_.getClient(this_.state.adminData.client_id);
        });
      } else {
        this_.setState({ apiKey: null });
      }
    });
  }

  getClient() {
    fetch(apiBase+"/client", {
      method: "get",
      headers: {
        'Authorization': this.state.apiKey,
        'Tbapikey': this.state.apiKey
      }
    })
    .then(response => response.json())
    .then(function(data) {
      if (!data.error) {
        this_.setState({ clientData: data.client[0] });
        this_.getRewards();
        this_.getMerchantPage();
      }
    });
  }

  getUser(userApiKey) {
    fetch(apiBase+"/users/"+userApiKey, {
      method: "get",
      headers: {
        'Authorization': this.state.apiKey,
        'Tbapikey': this.state.apiKey
      }
    })
    .then(response => response.json())
    .then(function(data) {
      if (!data.error) {
        this_.setState({ userData: data });
      } else {
        this_.showSnackbar("Error: "+data.message, "error");
      }
    });
  }

  getRewards() {
    fetch(apiBase+"/rewards", {
      method: "get",
      headers: {
        'Authorization': this.state.apiKey,
        'Tbapikey': this.state.apiKey
      }
    })
    .then(response => response.json())
    .then(function(data) {
      if (!data.error) {
        this_.setState({ rewardData: data.rewards });
      }
    });
  }

  getMerchantPage() {
    fetch(apiBase+"/pages", {
      method: "get",
      headers: {
        'Authorization': this.state.apiKey,
        'Tbapikey': this.state.apiKey
      }
    })
    .then(response => response.json())
    .then(function(data) {
      if (!data.error) {
        this_.setState({ merchantPageData: data.pages });
      }
    });
  }

  handleResetQR(location_id) {
    let new_code = this.randomString(10);
    fetch(apiBase+"/locations/"+location_id, {
      method: "put",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': this.state.apiKey,
        'Tbapikey': this.state.apiKey
      },
      body: this.xwwwfurlenc({
        token: new_code
      })
    })
    .then(response => response.json())
    .then(function(data) {
      if (!data.error) {
        this_.showSnackbar("QR Codes have been reset.", "success");
        this_.getClient();
      } else {
        this_.showSnackbar("Error: "+data.message, "error");
      }
    });
  }

  getQR(data) {
    if (data === "clear") {
      this_.setState({ displayQR: null });
    } else {
      fetch(apiBase+"/qr", {
        method: "post",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': this.state.apiKey,
          'Tbapikey': this.state.apiKey
        },
        body: this.xwwwfurlenc(data)
      })
      .then(response => response.json())
      .then(function(data) {
        if (!data.error) {
          this_.setState({ displayQR: data });
        } else {
          this_.setState({ displayQR: null });
        }
      });
    }
  }

  handleManualScan(data) {
    fetch(apiBase+"/scan_points", {
      method: "post",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': this.state.apiKey,
        'Tbapikey': this.state.apiKey
      },
      body: this.xwwwfurlenc(data)
    })
    .then(response => response.json())
    .then(function(data) {
      if (!data.error) {
        this_.showSnackbar("Points have been updated.", "success");
        this_.getUser(this_.state.userData.userDetails[0].api_key);
      } else {
        this_.showSnackbar("Error: "+data.message, "error");
      }
    });
  }

  handleManualClaim(data) {
    fetch(apiBase+"/claim_scan", {
      method: "post",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': this.state.apiKey,
        'Tbapikey': this.state.apiKey
      },
      body: this.xwwwfurlenc(data)
    })
    .then(response => response.json())
    .then(function(data) {
      if (!data.error) {
        this_.showSnackbar("Reward has been claimed.", "success");
        this_.getUser(this_.state.userData.userDetails[0].api_key);
      } else {
        this_.showSnackbar("Error: "+data.message, "error");
      }
    });
  }

  handleVIPadd(data) {
    fetch(apiBase+"/vip", {
      method: "post",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': this.state.apiKey,
        'Tbapikey': this.state.apiKey
      },
      body: this.xwwwfurlenc(data)
    })
    .then(response => response.json())
    .then(function(data) {
      if (!data.error) {
        this_.showSnackbar("VIP status has been updated.", "success");
        this_.getUser(this_.state.userData.userDetails[0].api_key);
      } else {
        this_.showSnackbar("Error: "+data.message, "error");
      }
    });
  }

  handleVIPdelete(user_id) {
    fetch(apiBase+"/vip/"+user_id, {
      method: "delete",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': this.state.apiKey,
        'Tbapikey': this.state.apiKey
      }
    })
    .then(response => response.json())
    .then(function(data) {
      if (!data.error) {
        this_.showSnackbar("VIP status has been removed.", "success");
        this_.getUser(this_.state.userData.userDetails[0].api_key);
      } else {
        this_.showSnackbar("Error: "+data.message, "error");
      }
    });
  }

  getOrders(location_id) {
    fetch(apiBase+"/orders/location/"+location_id, {
      method: "get",
      headers: {
        'Authorization': this.state.apiKey,
        'Tbapikey': this.state.apiKey
      }
    })
    .then(response => response.json())
    .then(function(data) {
      if (!data.error) {
        this_.setState({ orderData: data.orders });
      } else {
        this_.showSnackbar("Error: "+data.message, "error");
      }
    });
  }

  getOrderReceipt(order_id) {
    fetch(apiBase+"/orders/receipt/"+order_id, {
      method: "get",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': this.state.apiKey,
        'Tbapikey': this.state.apiKey
      }
    })
    .then(response => response.json())
    .then(function(data) {
      if (!data.error) {
        this_.setState({
          orderData: (this_.state.orderData.map(order => order.id === order_id ? {...order, receipt: data.orders[0].receipt} : order))
        });
      } else {
        this_.showSnackbar("Error: "+data.message, "error");
      }
    });
  }

  handleOrderStatus(order_id, status) {
    fetch(apiBase+"/order/"+order_id, {
      method: "put",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': this.state.apiKey,
        'Tbapikey': this.state.apiKey
      },
      body: this.xwwwfurlenc({
        status: status
      })
    })
    .then(response => response.json())
    .then(function(data) {
      if (!data.error) {
        this_.setState({
          orderData: (this_.state.orderData.map(order => order.id === order_id ? {...order, status: status} : order))
        }, function() {
          this_.showSnackbar("The order has been updated.", "success");
        });
      } else {
        this_.showSnackbar("Error: "+data.message, "error");
      }
    });
  }

  handleOrderPaid(order_id) {
    fetch(apiBase+"/order/"+order_id, {
      method: "put",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': this.state.apiKey,
        'Tbapikey': this.state.apiKey
      },
      body: this.xwwwfurlenc({
        paid: 1
      })
    })
    .then(response => response.json())
    .then(function(data) {
      if (!data.error) {
        this_.setState({
          orderData: (this_.state.orderData.map(order => order.id === order_id ? {...order, paid: 1} : order))
        }, function() {
          this_.getOrderReceipt(order_id);
          this_.showSnackbar("The order has been updated.", "success");
        });
      } else {
        this_.showSnackbar("Error: "+data.message, "error");
      }
    });
  }

  xwwwfurlenc(srcjson){
    if(typeof srcjson !== "object")
      if(typeof console !== "undefined"){
        console.log("\"srcjson\" is not a JSON object");
        return null;
      }
    var u = encodeURIComponent;
    var urljson = "";
    var keys = Object.keys(srcjson);
    for(var i=0; i <keys.length; i++){
        urljson += u(keys[i]) + "=" + u(srcjson[keys[i]]);
        if(i < (keys.length-1))urljson+="&";
    }
    // console.log(urljson);
    return urljson;
  }

  randomString(char) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i=0; i < char; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  render() {
    const { snackbarOpen, snackbarMessage, snackbarClass } = this.state;

    if (!this.state.apiKey) {
      return (
        <center>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={snackbarOpen}
            onClose={this.hideSnackbar}
            message={snackbarMessage}
            className={snackbarClass}
          />
          <img src="icon.png" alt="TrueBlue" className="login-icon" style={{margin: "30px 0 10px"}} />
          <Typography variant="h4" className="login-h4" color="inherit">
            TrueBlue Merchant
          </Typography>
          <LoginForm login_handler={this.adminLogin} />
        </center>
      );
    } else if (this.state.apiKey) {
      if (this.state.clientData) {
        return (
          <div>
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={snackbarOpen}
              onClose={this.hideSnackbar}
              message={snackbarMessage}
              className={snackbarClass}
            />
            <ClientArea
              data={this.state}
              handleGetUser={this.getUser}
              handleManualScan={this.handleManualScan}
              handleManualClaim={this.handleManualClaim}
              handleVIPadd={this.handleVIPadd}
              handleVIPdelete={this.handleVIPdelete}
              handleLogout={this.handleLogout}
              handleSnackbar={this.showSnackbar}
              handleResetQR={this.handleResetQR}
              handleGetOrders={this.getOrders}
              handleGetOrderReceipt={this.getOrderReceipt}
              handleOrderStatus={this.handleOrderStatus}
              handleOrderPaid={this.handleOrderPaid}
              getQR={this.getQR}
            />
          </div>
        );
      } else {
        return (
          <div>Loading...</div>
        );
      }
    }
  }
}

export default App;

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
const apiBase = "http://live.trueblue.guru/application/v1.5/admin-test";

const initialState = {
  apiKey: null,
  adminData: null,
  clientData: null,
  userData: null,
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
    this.getRewards = this.getRewards.bind(this);
    this.getMerchantPage = this.getMerchantPage.bind(this);
    this.getQR = this.getQR.bind(this);
    this.handleManualScan = this.handleManualScan.bind(this);
    this.handleManualClaim = this.handleManualClaim.bind(this);
    this.handleVIPadd = this.handleVIPadd.bind(this);
    this.handleVIPdelete = this.handleVIPdelete.bind(this);
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
    let tb_headers = new Headers();
    tb_headers.append('Authorization', this.state.apiKey);
    tb_headers.append('Tbapikey', this.state.apiKey);

    console.log("getClient", apiBase, this.state.apiKey, tb_headers);
    fetch(apiBase+"/client", {
      method: "get",
      headers: tb_headers
    })
    .then(response => response.json())
    .then(function(data) {
      console.log("getClient", data);
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

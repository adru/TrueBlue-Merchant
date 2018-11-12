import React, {Component} from 'react';

import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  vip: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 3,
    borderStyle: 'solid',
    padding: '2px 10px',
    fontSize: 14,
    display: 'block',
    fontWeight: 'bold',
    marginRight: 10,
    background: "#000000",
    color: '#FFFFFF'
  },
  flexBox: {
    display: 'flex'
  },
  flexItem: {
    flexGrow: 1,
    textAlign: 'center'
  },
  marginSides: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  cardWrapper: {
    display: 'flex',
    padding: theme.spacing.unit * 3,
    flexWrap: 'wrap',
  },
  card: {
    margin: theme.spacing.unit,
    flexGrow: 1,
    textAlign: 'center'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    width: 200,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputBase: {
    width: '100%'
  },
  textField: {
    '& input': {
      textAlign: 'center',
      fontSize: 36
    }
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class UserArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addAmount: 0,
      reward_id: "",
      vip_id: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.handleManualScan = this.handleManualScan.bind(this);
    this.handleManualClaim = this.handleManualClaim.bind(this);
    this.handleVIP = this.handleVIP.bind(this);
    this.handleVIPadd = this.handleVIPadd.bind(this);
    this.handleVIPdelete = this.handleVIPdelete.bind(this);
  }

  componentDidMount() {
    if (this.props.data && this.props.data.vip && this.props.data.vip[0]) {
      this.setState({
        vip_id: this.props.data.vip[0].id || null
      });
    }
  }

  componentDidUpdate() {
  }

  handleChange(event, name) {
    this.setState({
      [name]: event.target.value,
    });
  };

  add() {
    this.setState({ addAmount: this.state.addAmount+1 }, function() {
      console.log(this.state);
    });
  }

  subtract() {
    this.setState({ addAmount: this.state.addAmount-1 }, function() {
      console.log(this.state);
    });
  }

  handleManualScan() {
    const { data, token } = this.props;
    const { addAmount } = this.state;

    let scanData = {
      user_id: data.userDetails[0].id,
      amount: addAmount,
      token: token
    }

    this.props.handleManualScan(scanData);
    this.setState({
      addAmount: 0
    });
  }

  handleManualClaim() {
    const { data, token } = this.props;
    const { reward_id } = this.state;

    let claimData = {
      user_id: data.userDetails[0].id,
      reward_id: reward_id,
      token: token
    }

    this.props.handleManualClaim(claimData);
    this.setState({
      reward_id: ""
    });
  }

  handleVIP() {
    const { vip_id } = this.state;
    if (vip_id === "delete") {
      this.handleVIPdelete();
    } else {
      this.handleVIPadd();
    }
  }

  handleVIPadd() {
    const { data } = this.props;
    const { vip_id } = this.state;

    let vipData = {
      user_id: data.userDetails[0].id,
      vip_id: vip_id,
    }

    this.props.handleVIPadd(vipData);
  }

  handleVIPdelete() {
    const { data } = this.props;
    const { vip_id } = this.state;

    this.props.handleVIPdelete(data.userDetails[0].id);
  }

  render() {
    const { classes, data, clientData } = this.props;
    const { addAmount, reward_id, vip_id } = this.state;
    const timestamp = new Date(data.userDetails[0].created*1000);
    const created = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: 'numeric'}).format(timestamp);
    console.log(clientData, clientData.locations);
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5" className={classes.flexBox + " " + classes.flexItem}>
              {data.vip[0] &&
                <div className={classes.vip}>{data.vip[0].name}</div>
              }
              {data.userDetails[0].name}
            </Typography>
            <div className={classes.flexBox}>
              <div className={classes.flexItem + " " + classes.marginSides}>
                <Typography color="textSecondary" variant="caption">
                  Joined
                </Typography>
                <Typography gutterBottom component="p">
                  {created}
                </Typography>
              </div>
              <div className={classes.flexItem + " " + classes.marginSides}>
                <Typography color="textSecondary" variant="caption">
                  Total points earned
                </Typography>
                <Typography gutterBottom component="p">
                  {data.userDetails[0].points}
                </Typography>
              </div>
              <div className={classes.flexItem + " " + classes.marginSides}>
                <Typography color="textSecondary" variant="caption">
                  Total rewards redeemed
                </Typography>
                <Typography component="p">
                  {data.userDetails[0].redeemed_count}
                </Typography>
              </div>
            </div>
          </Toolbar>
        </AppBar>

        <div className={classes.cardWrapper}>
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography variant="subtitle1">
                  Current Points
                </Typography>
                <Typography component="h5" variant="h5">
                  {data.userDetails[0].current_points}
                </Typography>
                <div className={classes.controls}>
                  <IconButton onClick={this.subtract}>
                    <i className="fas fa-minus"></i>
                  </IconButton>
                  <TextField
                    id="standard-number"
                    value={addAmount}
                    onChange={(e) => this.handleChange(e, 'addAmount')}
                    type="number"
                    className={classes.textField}
                    margin="normal"
                  />
                  <IconButton onClick={this.add}>
                    <i className="fas fa-plus"></i>
                  </IconButton>
                </div>
                <Button variant="contained" disabled={!addAmount} color="primary" className={classes.button} onClick={this.handleManualScan}>
                  Add Points
                </Button>
              </CardContent>
            </div>
          </Card>
          {data.clientRewards && data.clientRewards.length &&
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography variant="subtitle1">
                    Claim Rewards
                  </Typography>
                  <FormControl className={classes.controls}>
                    <InputLabel htmlFor="reward_id">Reward</InputLabel>
                    <Select
                      value={reward_id}
                      onChange={(e) => this.handleChange(e, 'reward_id')}
                      inputProps={{
                        name: 'reward_id',
                        id: 'reward_id',
                      }}
                      className={classes.inputBase}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {data.clientRewards.map(reward => (
                        <MenuItem value={reward.id} key={reward.id}>
                          <span dangerouslySetInnerHTML={{__html: reward.reward_name + " ("+reward.reward_points+" points)"}} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button variant="contained" disabled={!reward_id} color="primary" className={classes.button} onClick={this.handleManualClaim}>
                    Claim this Reward
                  </Button>
                </CardContent>
              </div>
            </Card>
          }
          {clientData && clientData.vips && clientData.vips.length &&
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography variant="subtitle1">
                    VIP Status
                  </Typography>
                  <FormControl className={classes.controls}>
                    <InputLabel htmlFor="vip_id">VIP Levels</InputLabel>
                    <Select
                      value={vip_id}
                      onChange={(e) => this.handleChange(e, 'vip_id')}
                      inputProps={{
                        name: 'vip_id',
                        id: 'vip_id',
                      }}
                      className={classes.inputBase}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="delete">
                        <em>Remove VIP Status</em>
                      </MenuItem>
                      {clientData.vips.map(vip => (
                        <MenuItem value={vip.id} key={vip.id}>
                          <span dangerouslySetInnerHTML={{__html: vip.name + " ("+vip.discount+"% discount)"}} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button variant="contained" disabled={data.vip && data.vip[0] && data.vip[0].id == vip_id} color="primary" className={classes.button} onClick={this.handleVIP}>
                    Update VIP Status
                  </Button>
                </CardContent>
              </div>
            </Card>
          }
        </div>
      </div>
    );
  }
}

UserArea.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserArea);

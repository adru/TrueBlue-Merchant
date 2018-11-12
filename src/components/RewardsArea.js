import React, {Component} from 'react';
import QRCode from 'qrcode-react';

import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputBase: {
    width: '100%'
  },
});

class RewardsArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      location_token: null,
      reward_id: "",
      reward_name: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      location_token: this.props.location.location_token
    }, function() {
      if (this.props.data.rewardData && this.props.data.rewardData.length === 1) {
        this.setState({
          reward_id: this.props.data.rewardData[0].id,
          reward_name: this.props.data.rewardData[0].reward_name
        }, function() {
          this.props.getQR(this.state);
        });
      }
    });
  }

  componentDidUpdate() {
  }

  handleChange(event, name) {
    this.setState({
      [name]: event.target.value,
    }, function() {
      this.props.getQR(this.state);
    });
  };

  render() {
    const { classes, data, location } = this.props;
    const { reward_id, reward_name } = this.state;

    if (data.rewardData) {
      return (
        <div>
          <Paper title={(data.displayQR) ? data.displayQR.code : ""} className={classes.qrWrapper}>
              {(data.rewardData && data.rewardData.length > 1) ?
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
                    {data.rewardData.map(reward => (
                      <MenuItem value={reward.id} key={reward.id}>
                        <span dangerouslySetInnerHTML={{__html: reward.reward_name + " ("+reward.reward_points+" points)"}} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              :
                <Typography color="textSecondary" variant="h6">
                  {reward_name}
                </Typography>
              }
            {data.displayQR &&
              <QRCode
                value={data.displayQR.code}
                size={400}
                logo={data.clientData.client_icon}
              />
            }
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

RewardsArea.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RewardsArea);

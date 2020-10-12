import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../../components/layout/Navbar";
import "./Dashboard.css";
import {
  setUserWins,
  setUserLosses,
  setUserWinPercentage,
  addNewPick,
  getLeaderboard,
} from "../../actions/recordActions";
import Leaderboard from "./Leaderboard";
import Search from "../../components/search/Search";
import Button from "@material-ui/core/Button";

const Dashboard = (props) => {
  const [currentContests, setCurrentContests] = useState();
  const [pickFormSelectedLeague, setPickFormSelectedLeague] = useState();
  const [pickedGame, setPickedGame] = useState();

  const onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  const setUserLosses = (e) => {
    const { user } = this.props.auth;
    const { picks } = this.props.picks;
    this.props.setUserLosses(user);
    this.props.setUserWinPercentage(user);
    this.setState({ user: this.state });
  };

  const setUserWins = (e) => {
    const { user } = this.props.auth;
    const { picks } = this.props.picks;
    this.props.setUserWins(user);
    this.props.setUserWinPercentage(user);
  };

  const addNewPick = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    const { picks } = this.props.picks;
    this.props.addNewPick(user);
  };

  const getLeaderboard = (e) => {
    const { user } = this.props.auth;
    this.props.getLeaderboard(user);
  };

  const handlePickedGame = (e) => {
    setPickedGame(e.target.value.split("@"));
  };

  const handleLeagueSelect = async (e) => {
    setCurrentContests(null);
    let trial = [];
    const API = "99c6825e69439d43aa6e980669728613";
    await axios
      .get(
        `https://api.the-odds-api.com/v3/odds/?apiKey=${API}&sport=${
          e.target.options[e.target.options.selectedIndex].value
        }&region=us&mkt=h2h`
      )
      .then((res) => {
        let gamesWithinTwoDays = [];
        let cutOffTime = Date.now() + 86400000;
        trial = res.data.data;
        trial.forEach(function (item) {
          if (item.commence_time <= cutOffTime / 1000) {
            gamesWithinTwoDays.push(item);
          }
        });

        setCurrentContests(gamesWithinTwoDays);
      });
  };

  const pickFormLeagueSelect = async (e) => {
    setPickFormSelectedLeague(null);
    let trial = [];
    const API = "99c6825e69439d43aa6e980669728613";
    await axios
      .get(
        `https://api.the-odds-api.com/v3/odds/?apiKey=${API}&sport=${
          e.target.options[e.target.options.selectedIndex].value
        }&region=us&mkt=h2h`
      )
      .then((res) => {
        let gamesWithinTwoDays = [];
        let cutOffTime = Date.now() + 86400000;
        trial = res.data.data;
        trial.forEach(function (item) {
          if (item.commence_time <= cutOffTime / 1000) {
            gamesWithinTwoDays.push(item);
          }
        });

        setPickFormSelectedLeague(gamesWithinTwoDays);
      });
  };

  const { user } = props.auth;
  const { leaderboard } = props.leaderboard;

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <div className="my-profile">
          <h5 className="username">Welcome, {user.username}!</h5>
          <div className="profile-details">
            <div className="profile-image-container">
              <div className="my-profile-image"></div>
            </div>
            <div>
              <b>Record:</b> {user.wins} - {user.losses}
              <br />
              <b>Win Percentage:</b> {user.winPercentage}%
              <br />
              <b>Last 10 picks:</b> 0 - 0
            </div>
            <br />
            <Button variant="contained" color="secondary">
              View Profile
            </Button>
          </div>
        </div>

        <div className="select-league-container">
          <form className="select-league-form">
            <div className="league-select">
              <select
                className="dashboard-league-select"
                id="league"
                name="league-select"
                onChange={handleLeagueSelect}
              >
                <option defaultValue="null">
                  Pick League Here To See Upcoming Games
                </option>
                <option value="americanfootball_nfl">NFL</option>
                <option value="basketball_nba">NBA</option>
                <option value="icehockey_nhl">NHL</option>
                <option value="baseball_mlb">MLB</option>
              </select>
            </div>
            <div className="picked-league-games">
              {currentContests
                ? currentContests.map((contest) => (
                    <h5 key={contest.home_team} className="league-games">
                      {/* <span className="game-times">{contest.commence_time}</span>{" "} */}
                      {contest.teams[1] === contest.home_team
                        ? contest.teams[0]
                        : contest.teams[1]}{" "}
                      @ {contest.home_team}
                    </h5>
                  ))
                : null}
            </div>
          </form>
        </div>

        <div className="enter-pick">
          <h3 className="enter-pick-title">Enter Picks Here</h3>
          <form className="enter-pick-form">
            <select
              className="dashboard-select"
              id="league"
              name="league-select"
              onChange={pickFormLeagueSelect}
            >
              <option defaultValue>Pick League Here</option>
              <option value="americanfootball_nfl">NFL</option>
              <option value="basketball_nba">NBA</option>
              <option value="icehockey_nhl">NHL</option>
              <option value="baseball_mlb">MLB</option>
            </select>
            <select
              onChange={handlePickedGame}
              className="dashboard-select"
              id="league"
              name="game-select"
            >
              <option defaultValue>Pick Your Game</option>
              {pickFormSelectedLeague
                ? pickFormSelectedLeague.map((contest) => (
                    <option key={contest.home_team}>
                      {contest.teams[1] === contest.home_team
                        ? contest.teams[0]
                        : contest.teams[1]}{" "}
                      @ {contest.home_team}
                    </option>
                  ))
                : null}
            </select>
            <select className="dashboard-select" id="league" name="team-select">
              <option defaultValue>Pick Your Team</option>
              {pickedGame
                ? pickedGame.map((team) => <option key={team}>{team}</option>)
                : null}
            </select>
            <select
              className="dashboard-select"
              id="league"
              name="bet-type-select"
            >
              <option defaultValue>Pick Your bet Type</option>
              <option value="spread">Spread</option>
              <option value="moneyLine">Money Line</option>
            </select>
            <Button
              variant="contained"
              color="secondary"
              className="enter-pick-button"
              type="submit"
            >
              Enter Pick
            </Button>
          </form>
        </div>
        <div className="break"></div>
      </div>
      <Leaderboard className="leaderboard" />
      <Search />
    </div>
  );
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  setUserWins: PropTypes.func.isRequired,
  setUserLosses: PropTypes.func.isRequired,
  setUserWinPercentage: PropTypes.func.isRequired,
  getLeaderboard: PropTypes.func.isRequired,
  addNewPick: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  picks: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  picks: state.picks,
  leaderboard: state.leaderboard,
});

export default connect(mapStateToProps, {
  logoutUser,
  setUserWins,
  setUserLosses,
  setUserWinPercentage,
  addNewPick,
  getLeaderboard,
})(Dashboard);

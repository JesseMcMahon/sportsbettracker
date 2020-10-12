import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import Navbar from "../layout/Navbar";
import Button from "@material-ui/core/Button";

const Profile = (props) => {
  const [pickedUserProfile, setPickedUserProfile] = useState();
  const history = useHistory();

  useEffect(() => {
    getUserProfile();
  }, []);

  const onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  const getUserProfile = async () => {
    const thisUser = props.location.pathname;
    const pickedUser = await axios.get(`http://localhost:5000/api${thisUser}`);
    setPickedUserProfile(pickedUser.data);
  };

  const goBackToDashboard = () => {
    history.push("/dashboard");
  };

  return (
    <div>
      <Navbar />
      {pickedUserProfile ? (
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={goBackToDashboard}
          >
            Back to dashboard
          </Button>
          <div className="row">
            <div className="my-profile">
              <div className="profile-image-container">
                <div className="my-profile-image"></div>
              </div>
              <div className="profile-content">
                <h7 className="profile-record-stats">
                  <b>Record:</b> {pickedUserProfile.wins} -{" "}
                  {pickedUserProfile.losses}
                  <br />
                  <b>Win Percentage:</b> {pickedUserProfile.winPercentage}%
                  <br />
                  <b>Last 10:</b> 0 - 0
                </h7>
                <br />

                <h5 className="profile-username">
                  {pickedUserProfile.username}
                </h5>
              </div>
            </div>
          </div>
          <div>
            <h4 className="table-headline">Pick History</h4>
            <table className="leaderboard-table">
              <thead>
                <tr className="leaderboard-headers">
                  <th>Date</th>
                  <th>League</th>
                  <th>Game</th>
                  <th>Pick</th>
                  <th>Result</th>
                </tr>
              </thead>

              <tbody className="leaderboard-table-body">
                {pickedUserProfile.pickHistory
                  ? pickedUserProfile.pickHistory.map((item) => (
                      <tr className="upcoming-picks-table-row" key={item._id}>
                        <td className="upcoming-picks-list">09/08</td>
                        <td className="upcoming-picks-list">NFL</td>
                        <td className="upcoming-picks-list">{item.game}</td>
                        <td className="upcoming-picks-list">
                          {item.teamPicked}
                        </td>
                        <td className="upcoming-picks-list">Win</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;

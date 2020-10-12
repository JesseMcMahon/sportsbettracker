import React, { useEffect, useState } from "react";
import axios from "axios";
import "./leaderboard.css";
import { useHistory } from "react-router-dom";

const Leaderboard = () => {
  const [currentLeaderboard, setCurrentLeaderboard] = useState();
  const [goToUserProfile, setGoToUserProfile] = useState();
  const history = useHistory();
  const API = "99c6825e69439d43aa6e980669728613";

  useEffect(() => {
    handleGetLeaderboard();
  }, []);

  const handleGetLeaderboard = async () => {
    const data = await axios.get(
      "http://localhost:5000/api/picks/getleaderboard"
    );
    setCurrentLeaderboard(data.data);
  };

  const goToUser = async (e) => {
    const thisUser = e.target.value;
    history.push(`/picks/${thisUser}`);
  };

  return (
    <div className="leaderboard-container">
      <table>
        <thead>
          <tr className="leaderboard-headers">
            <th>RANK</th>
            <th>USERNAME</th>
            <th>RECORD</th>
            <th>WIN %</th>
          </tr>
        </thead>

        <tbody className="leaderboard-table-body">
          {currentLeaderboard
            ? currentLeaderboard.map((user) => (
                <tr className="leaderboard-table-row" key={user._id}>
                  <td>{user.rank}</td>
                  <td>
                    <button
                      className="user-button"
                      value={user.username}
                      onClick={goToUser}
                    >
                      {user.username}
                    </button>
                  </td>
                  <td>
                    {user.wins} - {user.losses}
                  </td>
                  <td>{user.winPercentage}%</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div
      style={{
        background: "#1d365e",
        height: "100vh",
        width: "100vw",
      }}
      className=" valign-wrapper"
    >
      <div className="row">
        <div className="col s12 center-align">
          <h4 style={{ fontSize: "72px" }} className="white-text">
            Beat Your Bookie
          </h4>
          <p className="flow-text white-text text-darken-1">
            Connect with some of the most successful sports bettors
            <br />
            from all over the world and compete to claim your spot on the
            leaderboard!
          </p>
          <br />
          <div
            style={{
              width: "50%",
              marginLeft: "25%",
            }}
            className="col s6"
          >
            <Link
              to="/login"
              style={{
                width: "360px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                border: "1px solid black",
                marginBottom: "15px",
              }}
              className="btn btn-large btn-flat waves-effect hoverable white black-text"
            >
              Log In
            </Link>
            <Link
              to="/register"
              style={{
                width: "360px",
                borderRadius: "3px",
                letterSpacing: "1px",
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Don't have an account? Sign up!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;

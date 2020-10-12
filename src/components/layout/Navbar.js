import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div
            style={{
              backgroundColor: "#1d365e",
              borderBottom: "1px solid #ccc",
            }}
            className="nav-wrapper"
          >
            <h5
              style={{ fontFamily: "Crimson Text" }}
              className="col s5 brand-logo center white-text"
            >
              BEAT YOUR BOOKIE
            </h5>
            <a
              href="#"
              style={{ float: "right", marginRight: "15px" }}
              onClick={this.onLogoutClick}
            >
              Logout
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);

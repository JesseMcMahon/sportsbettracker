import axios from "axios";

import {
  SET_USER_WINS,
  SET_USER_LOSSES,
  SET_USER_WIN_PERCENTAGE,
  ADD_NEW_PICK,
  GET_LEADERBOARD,
} from "./types";

export const setUserWins = (user) => (dispatch) => {
  axios.post("http://localhost:5000/api/picks/updatewins", user).then((res) => {
    console.log(res);
  });
  dispatch({
    type: SET_USER_WINS,
    payload: user,
  });
};

export const setUserLosses = (user) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/picks/updatelosses", user)
    .then((res) => {
      console.log(res);
    });
  dispatch({
    type: SET_USER_LOSSES,
    payload: user,
  });
};

export const setUserWinPercentage = (user) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/picks/updatewinpercentage", user)
    .then((res) => {
      console.log(res);
    });
  dispatch({
    type: SET_USER_WIN_PERCENTAGE,
    payload: user,
  });
};

export const addNewPick = (user) => (dispatch) => {
  axios.post("http://localhost:5000/api/picks/addnewpick", user).then((res) => {
    console.log(user);
  });
  dispatch({
    type: ADD_NEW_PICK,
    payload: user,
  });
};

export const getLeaderboard = (users) => (dispatch) => {
  axios
    .get("http://localhost:5000/api/picks/getleaderboard", users)
    .then((users) => {
      console.log(users.data);
      return users.data;
    });
  dispatch({
    type: GET_LEADERBOARD,
    payload: { users },
  });
};

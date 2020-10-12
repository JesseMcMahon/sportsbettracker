import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import pickReducer from "./pickReducers";
import leaderboardReducer from "./leaderboardReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  picks: pickReducer,
  leaderboard: leaderboardReducer,
});

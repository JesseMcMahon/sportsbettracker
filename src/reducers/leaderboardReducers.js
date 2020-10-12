import { GET_LEADERBOARD } from "../actions/types";

const initialState = {
  leaderboard: [],
  error: null,
};

export default function leaderboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.payload,
      };
    default:
      return state;
  }
}

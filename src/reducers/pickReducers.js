import {
  SET_USER_WINS,
  SET_USER_LOSSES,
  SET_USER_WIN_PERCENTAGE,
  ADD_NEW_PICK,
} from "../actions/types";

const initialState = {
  picks: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_WINS:
      return {
        ...state,
        picks: action.payload,
      };
    case SET_USER_LOSSES:
      return {
        ...state,
        picks: action.payload,
      };
    case SET_USER_WIN_PERCENTAGE:
      return {
        ...state,
        picks: action.payload,
      };
    case ADD_NEW_PICK:
      return {
        ...state,
        picks: action.payload,
      };
    default:
      return state;
  }
}

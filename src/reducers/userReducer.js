import { CREATE_NEW_USER, GET_USER_PROFILE, LOGOUT_USER, UPDATE_PROFILE } from '../actions/types';

const initialState = {
      info: {
        cellphoneNumber: "",
        emailAddress: "",
        friends: [],
        incomingFriendRequests: [],
        isOnline: false,
        joinedDate: "",
        outgoingFriendRequests: [],
        incomingMealMatch: [],
        outgoingMealMatch: [],
        password: "Haha, you no see.",
        username: "",
        _id: ""
}}

const userReducer = (state = initialState, action) => {
 switch(action.type){
    case CREATE_NEW_USER:
      return {
        ...state,
        info: action.payload
      }
    case GET_USER_PROFILE:
      return { ...state,
        info: action.payload
      }
    case UPDATE_PROFILE:
      return { ...state,
        info: action.payload
      }
    case LOGOUT_USER:
      return {
        ...state,
        info: initialState.info
      }
    default:
      return state
  }
}

export default userReducer;
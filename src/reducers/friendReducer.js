import { ACCEPT_FRIEND, CANCEL_FRIEND, DECLINE_FRIEND, FRIEND_REQUEST, REMOVE_FRIEND, FRIEND_INFO } from '../actions/types';

const initialState = {
  info:{
    friend: [],
    allFriends: []
  }

}

const friendReducer = (state = initialState, action) => {
 switch(action.type){
    case FRIEND_REQUEST:
      return {
        ...state,
        info: action.payload
      }
      case ACCEPT_FRIEND:
      return {
        ...state,
        info: action.payload
      }
      case DECLINE_FRIEND:
      return {
        ...state,
        info: action.payload
      }
      case REMOVE_FRIEND:
      return {
        ...state,
        info: action.payload
      }
      case CANCEL_FRIEND:
      return {
        ...state,
        info: action.payload
      }
      case FRIEND_INFO:
        return {
          ...state,
          info: action.payload
        }
    default:
      return state
  }
}

export default friendReducer;
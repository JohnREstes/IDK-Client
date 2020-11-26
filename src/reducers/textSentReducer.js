import { TEXT_SENT } from '../actions/types';

const initialState = {
    info: ""  
}

const textSentReducer = (state = initialState, action) => {
 switch(action.type){
    case TEXT_SENT:
      return {
        ...state,
        info: action.payload
      }
    default:
      return state
  }
}

export default textSentReducer;
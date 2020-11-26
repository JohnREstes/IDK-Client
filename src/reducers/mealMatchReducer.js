import { GET_YELP_RESULTS } from '../actions/types';

const initialState = {
    info: {
        businesses: [{
                name: "",
                image_url: ""
        }]
    }    
}

const mealMatchReducer = (state = initialState, action) => {
 switch(action.type){
    case GET_YELP_RESULTS:
      return {
        ...state,
        info: action.payload
      }
    default:
      return state
  }
}

export default mealMatchReducer;
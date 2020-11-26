import { LOGIN_USER_PAGE, FRIEND_PAGE, CREATE_ACCOUNT_PAGE, HOME, MEAL_MATCH_SETUP_PAGE, SWIPE_PAGE, FINAL_PAGE, EDIT_PROFILE_PAGE } from '../actions/types';

let initialState = {
    type: LOGIN_USER_PAGE
}

const pageDisplayedReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_USER_PAGE:
            return  state = action;
        case HOME:
            return  state = action;
        case CREATE_ACCOUNT_PAGE:
            return state = action;
        case FRIEND_PAGE:
            return state = action;
        case MEAL_MATCH_SETUP_PAGE:
            return state = action;
        case SWIPE_PAGE:
            return state = action;
        case FINAL_PAGE:
            return state = action;
        case EDIT_PROFILE_PAGE:
            return state = action;
        default:
            return state
    }
}
export default pageDisplayedReducer;
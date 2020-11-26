import { combineReducers } from 'redux';
import pageDisplayedReducer from './pageDisplayedReducer'
import userReducer from './userReducer'
import stateUpdatedReducer from './stateUpdatedReducer'
import friendReducer from './friendReducer'
import mealMatchReducer from './mealMatchReducer'
import textSentReducer from './textSentReducer'

export default combineReducers({
    pageDisplayed: pageDisplayedReducer,
    user: userReducer,
    stateUpdated: stateUpdatedReducer,
    friendReducer: friendReducer,
    mealMatchReducer: mealMatchReducer,
    textSent: textSentReducer
})
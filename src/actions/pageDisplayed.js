import { LOGIN_USER_PAGE, HOME, CREATE_ACCOUNT_PAGE, FRIEND_PAGE, EDIT_PROFILE_PAGE, MEAL_MATCH_SETUP_PAGE, SWIPE_PAGE, FINAL_PAGE } from './types';

export const loginUserPage = () => dispatch => {
    dispatch({
        type: LOGIN_USER_PAGE
    });
};
export const createAccountPage = () => dispatch => {
    dispatch({
        type: CREATE_ACCOUNT_PAGE
    });
};

export const homePage = () => dispatch => {
    dispatch({
        type: HOME
    });
};

export const friendPage = () => dispatch => {
    dispatch({
        type: FRIEND_PAGE
    });
};

export const editProfilePage = () => dispatch => {
    dispatch({
        type: EDIT_PROFILE_PAGE
    });
};

export const mealMatchSetupPage = () => dispatch => {
    dispatch({
        type: MEAL_MATCH_SETUP_PAGE
    });
};
export const swipePage = () => dispatch => {
    dispatch({
        type: SWIPE_PAGE
    });
};
export const finalPage = () => dispatch => {
    dispatch({
        type: FINAL_PAGE
    });
};
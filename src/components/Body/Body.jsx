import React from 'react'
import { useSelector } from 'react-redux'
import Login from '../Login/Login'
import CreateAccount from '../CreateAccount/CreateAccount'
import MyFriends from '../Friends/Friends'
import EditProfilePage from '../EditProfile/EditProfile'
import Home from '../Home/Home'
import MealMatchSetup from '../MealMatch/MealMatchSetup'
import SwipePage from '../SwipePage/SwipePage'
import Results from '../ResultsPage/Results'
import { LOGIN_USER_PAGE, CREATE_ACCOUNT_PAGE, HOME, FRIEND_PAGE, MEAL_MATCH_SETUP_PAGE, SWIPE_PAGE, FINAL_PAGE, EDIT_PROFILE_PAGE } from '../../actions/types'

function Body(){
    const page = useSelector(state => state.pageDisplayed.type);
    console.log(page)
  switch(page){
        case HOME:
            return (
                <Home/>
            )
        case LOGIN_USER_PAGE:
            return (
                <Login/>
            )
        case CREATE_ACCOUNT_PAGE:
            return (
                <CreateAccount/>
            )
        case FRIEND_PAGE:
            return (
                <MyFriends/>
            )
        case EDIT_PROFILE_PAGE:
            return (
                <EditProfilePage/>
            )
        case MEAL_MATCH_SETUP_PAGE:
            return (
                <MealMatchSetup/>
            )
        case SWIPE_PAGE:
            return (
                <SwipePage/>
            )
        case FINAL_PAGE:
            return (
                <Results/>
            )    
        default:
            return
    }
}

export default (Body);
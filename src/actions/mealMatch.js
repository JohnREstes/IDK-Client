import { GET_YELP_RESULTS, SEND_MEAL_MATCH, SUBMIT_MEAL_MATCH, REMOVE_MEAL_MATCH } from './types';
import axios from 'axios'
import { getUser } from './user';
import { updateFriends } from './friendActions'

export const yelpResults = data => dispatch => {
    console.log(data.term + " " + data.location);
    console.log('Getting Yelp Results');
    const config = {
        method: 'get',
        url: 'https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/external/yelp',
        params: {
            term: data.term,
            location: data.location
        }
    }
    axios(config)
    .then(res => {
        dispatch({
            type: GET_YELP_RESULTS,
            payload: res.data,
        })
    })
    .catch(err => {
        console.log('this is your error ' + err)
    })
    return true
};

export const mealMatchRequest = (data) => dispatch => {
    console.log(data)
    const JsonWT = localStorage.getItem("JWT");
    const config = {
        method: 'put',
        url: 'https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/users/update-MealMatch',
        headers: { 'x-auth-token': JsonWT },
        data: { 
            mealMatch: [...data.mealMatch],
            friend: data.friend
        }
    }
  axios(config)
  .then(res => {
    dispatch({
            type: SEND_MEAL_MATCH,
            payload: res.data
        }) 
        dispatch(getUser());
    })
    .catch(err => {
        console.log('this is your error ' + err)
    })
}

export const submitMealMatch = (data) => dispatch => {
    console.log('Submit Meal Match Selections')
    const JsonWT = localStorage.getItem("JWT");
    const config = {
        method: 'put',
        url: 'https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/users/submit-MealMatch',
        headers: { 'x-auth-token': JsonWT },
        data: { 
            mealMatch: [...data.mealMatch],
            direction: data.direction
        }
    }
  axios(config)
  .then(res => {
    dispatch({
            type: SUBMIT_MEAL_MATCH,
            payload: res.data
        }) 
        dispatch(updateFriends())
    })
    .catch(err => {
        console.log('this is your error ' + err)
    })
}

export const mealMatchRemoval = (data) => dispatch => {
    console.log(data)
    const JsonWT = localStorage.getItem("JWT");
    const config = {
        method: 'put',
        url: 'https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/users/remove-MealMatch',
        headers: { 'x-auth-token': JsonWT },
        data: { 
            friend: data.friend
        }
    }
  axios(config)
  .then(res => {
    dispatch({
            type: REMOVE_MEAL_MATCH,
            payload: res.data
        }) 
        dispatch(getUser());
    })
    .catch(err => {
        console.log('this is your error ' + err)
    })
}
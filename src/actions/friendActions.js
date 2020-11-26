import axios from 'axios'
import { FRIEND_REQUEST, ACCEPT_FRIEND, DECLINE_FRIEND, REMOVE_FRIEND, CANCEL_FRIEND, STATE_UPDATED, FRIEND_INFO } from "./types"
import { getUser } from './user';

export const friendRequest = (usernameOrEmailAddress) => dispatch => {
    const JsonWT = localStorage.getItem("JWT");
    const config = {
        method: 'put',
        url: 'https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/users/request-friend',
        headers: { 'x-auth-token': JsonWT },
        data: { usernameOrEmailAddress: usernameOrEmailAddress }
    }

  axios(config).then(res => {
    dispatch({
            type: FRIEND_REQUEST,
            payload: res.data
        }) 
    })
    .then(() => dispatch(getUser()))
    .then(() => dispatch({
        type: STATE_UPDATED
    }
    ));
}

export const acceptFriend = (username) => dispatch => {
    const JsonWT = localStorage.getItem("JWT");
    const config = {
        method: 'put',
        url: 'https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/users/accept-friend-request',
        headers: { 'x-auth-token': JsonWT },
        data: { username: username }
    }

  axios(config).then(res => {dispatch({
            type: ACCEPT_FRIEND,
            payload: res.data
        }) 
    })
    .then(() => dispatch(getUser()))
    .then(() => dispatch({
        type: STATE_UPDATED
    }));
}

export const declineFriend = (username) => dispatch => {
    const JsonWT = localStorage.getItem("JWT");
    const config = {
        method: 'put',
        url: 'https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/users/decline-friend-request',
        headers: { 'x-auth-token': JsonWT },
        data: { username: username}
    }

  axios(config).then((res) => {
    dispatch({
      type: DECLINE_FRIEND,
      payload: res.data,
    });
  })
  .then(() => dispatch(getUser()))
  .then(() => dispatch({
    type: STATE_UPDATED
}));
}


export const removeFriend = (username) => dispatch => {
    const JsonWT = localStorage.getItem("JWT");
    const config = {
        method: 'put',
        url: 'https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/users/remove-friend',
        headers: { 'x-auth-token': JsonWT },
        data: { username: username }
    }

  axios(config).then(res => {dispatch({
            type: REMOVE_FRIEND,
            payload: res.data
        }) 
    })
    .then(() => dispatch(getUser()))
    .then(() => dispatch({
        type: STATE_UPDATED
    }));
}

export const cancelFriend = (username) => dispatch => {
    const JsonWT = localStorage.getItem("JWT");
    const config = {
        method: 'put',
        url: 'https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/users/cancel-friend-request',
        headers: { 'x-auth-token': JsonWT },
        data: { username: username }
    }

  axios(config)
    .then(res => {
        dispatch({
            type: CANCEL_FRIEND,
            payload: res.data
        }) 
    })
    .then(() => dispatch(getUser()))
    .then(() => dispatch({
        type: STATE_UPDATED
    }));
}

export const updateFriends = () => dispatch => {
    console.log("Getting Friends Info.");
    const JsonWT = localStorage.getItem("JWT");
    const tokenHeader = { headers: {
        'x-auth-token': JsonWT

    }}
    axios.get('https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/users/all-friends', tokenHeader)
    .then(res => {
        console.log(res.data);
        dispatch({
            type: FRIEND_INFO,
            payload: res.data,
        })
    })    
.catch(err => {
    console.log('This is your error ' + err)
})
};        
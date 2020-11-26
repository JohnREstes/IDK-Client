import { CREATE_NEW_USER, HOME, LOGIN_USER_PAGE, LOGOUT_USER, UPDATE_PROFILE } from './types';
import axios from 'axios'
import { updateFriends } from './friendActions'
//import { useSelector } from 'react-redux'
//import jwt_decode from "jwt-decode";


export const loginUser = userInfo => dispatch => {
    //const id = useSelector(state => state.user.info._id);
    console.log('Attempting to login  ' + userInfo.usernameOrEmailAddress)
    axios.post('https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/auth',{
        usernameOrEmailAddress: userInfo.usernameOrEmailAddress,
        password: userInfo.password
    })
    .then(res => {
        //var decoded = jwt_decode(res.data);
        //console.log(`Signed in successfully.`);
        localStorage.setItem("JWT", res.data)
        const JsonWT = localStorage.getItem("JWT");
        const tokenHeader = { headers: {
            'x-auth-token': JsonWT

        }}
        axios.get('https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/users/user-profile', tokenHeader)
        .then(res => {
            dispatch({
                type: CREATE_NEW_USER,
                payload: res.data,
            })
            dispatch(updateFriends());
            dispatch({
                type: HOME
            })
          })


    })
    .catch(err => {
        console.log('this is your error ' + err)
    })
};

export const getUser = () => dispatch => {
        console.log("Getting Profile.");
        const JsonWT = localStorage.getItem("JWT");
        const tokenHeader = { headers: {
            'x-auth-token': JsonWT

        }}
        axios.get('https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/users/user-profile', tokenHeader)
        .then(res => {
            dispatch({
                type: CREATE_NEW_USER,
                payload: res.data,
            })
        })   
    .catch(err => {
        console.log('This is your error ' + err)
    })
};        

export const createNewUser = userInfo => dispatch => {
    console.log("Creating new user")
    axios.post('https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/users',
    {
        username: userInfo.username,
        password: userInfo.password,
        emailAddress: userInfo.emailAddress,
        cellphoneNumber: userInfo.cellphoneNumber
    })
    .then(res => {
        console.log("Created a new user successfully.");
        console.log(res.data);
        localStorage.setItem("JWT", res.data)
        const JsonWT = localStorage.getItem("JWT");
        const tokenHeader = { headers: {
            'x-auth-token': JsonWT
        }}
        axios.get('https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/users/user-profile', tokenHeader)
        .then(res => {
            dispatch({
                type: CREATE_NEW_USER,
                payload: res.data,
            })
            dispatch({
                type: HOME
            })
        })
    })
    .catch(err => {
        console.log('this is your error ' + err)
    })
};


export const updateProfile= (userData) => dispatch => {
    console.log(userData.data);
    console.log(userData.type);
    const JsonWT = localStorage.getItem("JWT");
    const config = {
        method: 'put',
        url: 'https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/users/update-profile',
        headers: { 'x-auth-token': JsonWT },
        data: { type: userData.type,
                data: userData.data
        }
    }
  axios(config)
    .then(res => {
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        }) 
        const JsonWT = localStorage.getItem("JWT");
        const tokenHeader = { headers: {
            'x-auth-token': JsonWT

        }}
        axios.get('https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/users/user-profile', tokenHeader)
        .then(res => {
            dispatch({
                type: CREATE_NEW_USER,
                payload: res.data,
            })
        }) 
    })
    .catch(err => {
        console.log('this is your error ' + err)
    })
}

export const logoutUser = () => dispatch => {
    console.log('logout user')
    dispatch({
        type: LOGOUT_USER
    });
    dispatch({
        type: LOGIN_USER_PAGE
    })
}
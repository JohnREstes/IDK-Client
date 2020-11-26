import { STATE_UPDATED, TEXT_SENT } from "./types"
import axios from 'axios'

export const stateUpdated = () => dispatch => {
    dispatch({
        type: STATE_UPDATED
    });
  };

  export const sendText = data => dispatch => {
    console.log(`Sending Text to ${data.cellphoneNumber}`);
    console.log(`Sending ${data.body}`)
    const config = {
        method: 'put',
        url: 'https://098p1ijppf.execute-api.us-east-1.amazonaws.com/dev/api/external/send-text',
        data: {
            body: data.body,
            to: data.cellphoneNumber
        }
    }
    axios(config)
    .then(res => {
        dispatch({
            type: TEXT_SENT,
            payload: res.data,
        })
    })
    .catch(err => {
        console.log('Error sending text : ' + err)
    })
};
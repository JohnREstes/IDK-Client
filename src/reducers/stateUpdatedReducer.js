import { STATE_UPDATED } from '../actions/types'

const stateUpdatedReducer = (state = false, action) => {
    switch(action.type){
        case STATE_UPDATED:
            return !state;
        default:
            return state;
    }
}
export default stateUpdatedReducer
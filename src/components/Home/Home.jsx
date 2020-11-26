import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mealMatchSetupPage } from '../../actions/pageDisplayed' 
import MealMatchButtons from './MealMatchButtons'
import SlotM from './SlotMachine'
//import RandomRestaurant from './RandomRestaurant'

class Home extends Component {

 render(){
  return (
    <div className="row">
        <div className="col-12 text-center">
          <div className="row">
            <div className="col-12 top-half">
              <h3>Welcome {this.props.username}!</h3><br></br>
              <h4>An app to solve the age old dilemma of where to eat!<br></br>
              </h4>
              <button className="contentButton" id='mealMatchButton'
                onClick={() => 
                {((this.props.friendsList.length>0) ? 
                this.props.mealMatchSetupPage() : 
                alert("You have no friends, you cannot setup a Meal Match"))}}
                >Create a Meal Match,<br></br>with your firends</button>
            
            <div className="col-12 text-center">
            {(this.props.outgoingMealMatch.length > 0 || this.props.incomingMealMatch.length > 0 ) ? <MealMatchButtons/> : <span/>}
            </div></div >
          </div>
          <div className="row">
            <div className="col-12 bottom-half">
              <h4>-or-</h4>
              <SlotM/>
            </div>
          </div>
        </div>
    </div>
  );
}
}

const mapDispatchToProps = dispatch => {
  return {    
    mealMatchSetupPage: () => dispatch(mealMatchSetupPage())
  }
}

const mapStateToProps = (state) => {
  return {  
    friendsList: state.user.info.friends,
    outgoingMealMatch: state.user.info.outgoingMealMatch,
    incomingMealMatch: state.user.info.incomingMealMatch,
    username: state.user.info.username,
  }
}

Home.propTypes = {
  mealMatchSetupPage: PropTypes.func.isRequired
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
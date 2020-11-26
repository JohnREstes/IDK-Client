import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mealMatchSetupPage, swipePage, finalPage } from '../../actions/pageDisplayed' 
import $ from 'jquery'

class MealMatchButtons extends Component {

  buildResults(){
    if(this.props.outgoingMealMatch.length > 0 || this.props.incomingMealMatch.length > 0){
        console.log(this.props.outgoingMealMatch.length);
        $('#mealMatchButton').prop('disabled',true).css('opacity',0.5);
      }
    let myChoice = false;
    if(this.props.outgoingMealMatch.length > 0){
        myChoice = this.props.outgoingMealMatch[0].modified;
    }
    let friendsChoices = [];
    let allFriendsComplete = [];
      for(let i = 0; i < this.props.friends.length; i++){
        if(this.props.friends[i].incomingMealMatch.length > 0){
          if(this.props.friends[i].incomingMealMatch[0].sender === this.props.username){
            friendsChoices.push({friend: [...this.props.friends[i].incomingMealMatch]});
          }
        }
      }
      console.log(friendsChoices)
      for(let i = 0; i < friendsChoices.length; i++){
          if(friendsChoices[i].friend[0].modified === true){
            allFriendsComplete.push(true);
          }
      }
      console.log(allFriendsComplete)
      let results = false
      if(allFriendsComplete.length > 0){
        results = allFriendsComplete.every(e => e === true);
      }
    console.log(myChoice);
    console.log(results);
    if(myChoice === true && results === true){
      return true
    }else{
      return false
    }
  }

 render(){
  return (
        <div>
            {(this.props.outgoingMealMatch.length > 0 && this.props.outgoingMealMatch[0].modified === false) ? 
            <button  className="contentButton" onClick={() => this.props.swipePage()}>You have an outgoing Meal Match,<br></br> that needs finshed</button> :
            (this.props.incomingMealMatch.length > 0  && this.props.incomingMealMatch[0].modified === false) ? <button  className="contentButton" onClick={() => this.props.swipePage()}>You have an incoming Meal Match,<br></br> that needs finished </button> : 
            <span/>}
            {(this.buildResults()) ?
            <button  className="contentButton" onClick={() => this.props.finalPage()}>Finish Your Meal Match</button> : 
            <><br></br><h3>Waiting on your friend to choose...</h3></>}
        </div>
  );
}
}

const mapDispatchToProps = dispatch => {
  return {    
    mealMatchSetupPage: () => dispatch(mealMatchSetupPage()),
    swipePage: () => dispatch(swipePage()),
    finalPage: () => dispatch(finalPage())
  }
}

const mapStateToProps = (state) => {
  return {  
    friendsList: state.user.info.friends,
    outgoingMealMatch: state.user.info.outgoingMealMatch,
    incomingMealMatch: state.user.info.incomingMealMatch,
    friends: state.friendReducer.info.allFriends,
    username: state.user.info.username
  }
}

MealMatchButtons.propTypes = {
  mealMatchSetupPage: PropTypes.func.isRequired,
  swipePage: PropTypes.func.isRequired,
  finalPage: PropTypes.func.isRequired, 
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealMatchButtons);
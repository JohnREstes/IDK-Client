import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mealMatchRemoval } from '../../actions/mealMatch'
import RestaurantCarousel from '../carousel/carousel'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { sendText } from '../../actions/generalActions'
import { getUser } from '../../actions/user'
import { homePage } from '../../actions/pageDisplayed'

class Results extends Component {

  constructor() {
    super()
    this.state = {
      chooseRestaurant: null
    }
    this.setRestaurant = this.setRestaurant.bind(this)
  }

  setRestaurant(e) {
    this.setState({
      chooseRestaurant: e
    })
  }

  buildResults(){
    let myChoices = [...this.props.outgoingMealMatch];
    let friendsChoices = [];
    let finalChoices = [];
      for(let i = 0; i < this.props.friends.length; i++){
        if(this.props.friends[i].incomingMealMatch.length > 0){
          if(this.props.friends[i].incomingMealMatch[0].sender === this.props.username){
            friendsChoices.push({friend: [...this.props.friends[i].incomingMealMatch]});
          }
        }
      }
      for(let i = 0; i < friendsChoices.length; i++){
        for(let j = 0; j < myChoices.length; j++){
          if(myChoices[j].selected === true && myChoices[j].selected === friendsChoices[i].friend[j].selected){
            finalChoices.push(myChoices[j]);
          }
        }
      }
    return(finalChoices);
  }

  onSubmit(){
    console.log('sending results')
    let friendsList = [];
    for(let i = 0; i < this.props.friends.length; i++){
      if(this.props.friends[i].incomingMealMatch.length > 0){
        if(this.props.friends[i].incomingMealMatch[0].sender === this.props.username){
          friendsList.push({friend: this.props.friends[i]})
        }
      }
    }
    console.log(friendsList);
    for(let i = 0; i < friendsList.length; i++){
      let friendsName = this.props.friends[i].username;
      let cellphoneNumber = this.props.friends[i].cellphoneNumber;
      const textData = {
          body: `Hello ${friendsName}, ${this.props.username} has completed your Meal Match!
          You are dining at ${this.state.chooseRestaurant.label}`,
          cellphoneNumber: `+1${cellphoneNumber}`
          }
      this.props.sendText(textData);
    }
    alert(`A Text Message has been sent to your Friend(s) letting them know your dining at ${this.state.chooseRestaurant.label}`)
    const mealMatchClear = {
      friend: friendsList
    }
    this.props.mealMatchRemoval(mealMatchClear);
    this.props.homePage();
  }  

  buildRestaurantSelector(){
    let restaurantList = this.buildResults()
    let restaurantJSON = [];
    for(let i = 0; i < restaurantList.length; i++){
        let restaurantObject = {
            value: restaurantList[i].name,
            label: restaurantList[i].name,
        }
        restaurantJSON.push(restaurantObject)
    }
    return restaurantJSON
  } 

  render() {
    return (
        <div className="row">
        <div className="col-12">
            <div className="row">
                <div className="col-12 header-div text-center">
                    <h3>You and Your Meal Mates<br></br>Selected these Restaurants</h3>
                </div>
            </div>
            <div className="row">
                  <div className="col-12 text-center">
                      <br></br>
                      <div className="demo-carousel col-md-4 mx-auto ">
                        <RestaurantCarousel businesses={this.buildResults()}/>
                        <Select
                        components={makeAnimated()}
                        onChange={this.setRestaurant}
                        noOptionsMessage={() => 'No Restaurant selected!'}
                        placeholder="Select Restaurant"
                        options = {this.buildRestaurantSelector()} />
                        <button  className="contentButton" onClick={() => this.onSubmit()} >Send Decison to Meal Mates</button>
                      </div>
                  </div> 
              
            </div>
        </div>
        </div>
    )
  }
}   

const mapDispatchToProps = dispatch => {
    return {    
      mealMatchRemoval: data => dispatch(mealMatchRemoval(data)),
      homePage: () => dispatch(homePage()),
      sendText: data => dispatch(sendText(data)),
      getUser: () => dispatch(getUser())
    }
  }

Results.propTypes = {
  mealMatchRemoval: PropTypes.func.isRequired,
  homePage: PropTypes.func.isRequired,
  sendText: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  outgoingMealMatch: state.user.info.outgoingMealMatch,
  friends: state.friendReducer.info.allFriends,
  username: state.user.info.username
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Results);
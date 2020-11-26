import React, { Component } from 'react'
import TinderCard from 'react-tinder-card'
import './swipe.css'
import { connect } from 'react-redux'
import { submitMealMatch } from '../../actions/mealMatch'
import PropTypes from 'prop-types'
import { sendText } from '../../actions/generalActions'
import { homePage } from '../../actions/pageDisplayed'

class SwipePage extends Component {
    constructor() {
        super()
        this.state = {
            lastDirection: null,
            restaurant: null,
            cardCount: 10
        }
        this.setLastDirection = this.setLastDirection.bind(this)
    }


    setLastDirection(direction, restaurantName){
      this.setState({
          lastDirection: direction,
          restaurant: restaurantName
      })
    }

    swiped(direction, restaurantName, data){
        this.setLastDirection(direction, restaurantName);
        if(direction !== "right"){
            let index = data.findIndex(x => x.name === restaurantName);
            data[index].selected = false;
        }
      }

    outOfFrame(name){
        this.setState({
            cardCount: this.state.cardCount - 1
        })
      }

    sendText(data){
        if(this.props.username !== data[0].sender){
        let originalUser = data[0].sender;
        let index = this.props.friends.findIndex(x => x.username === originalUser);
        let cellphoneNumber = this.props.friends[index].cellphoneNumber;
        const textData = {
            body: `Hello ${originalUser}, ${this.props.username} has completed their Meal Match!`,
            cellphoneNumber: `+1${cellphoneNumber}`
            }
        this.props.sendText(textData);
        alert("A Text Message has been sent to your Friend with your selections!")
    }  }

    onSubmit(e, data) {
        data[0].modified = true;
        e.preventDefault();
          const mealMatchData= {
            mealMatch: data,
            direction: ((this.props.cardsOut.length > 0) ? "out" : "in")
        }
        this.props.submitMealMatch(mealMatchData);
        this.sendText(data);
        this.props.homePage();
    }      

  render(){
    var data = ((this.props.cardsOut.length > 0) ? [...this.props.cardsOut] : [...this.props.cardsIn]);
    return (
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-12 text-center">
                        <h3>Time to decide!</h3>
                        <h4>Swipe Right to Select, Left to Discard!<br></br>
                        Then wait for your friends!</h4>
                    </div>
                </div>
            <div className="row">
                <div className='col-12 mx-auto cardContainer'>
                    <span>
                    {data.map((restaurant) =>
                    <TinderCard className='swipeCard' key={restaurant.name} onSwipe={(dir) => this.swiped(dir, restaurant.name, data)} onCardLeftScreen={() => this.outOfFrame(restaurant.name)}>
                        <div style={{ backgroundImage: 'url(' + restaurant.image_url + ')' }} className='cardDiv'>
                        <h3 style={{ backgroundColor: 'white' }}>{restaurant.name}</h3>
                        </div>
                    </TinderCard>
                    )}
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="col-12 text-center">
                    {(this.state.cardCount !== 0) ?
                    this.state.lastDirection ? 
                    (this.state.lastDirection !== "right") ? 
                    <h2 className='infoText'>You deleted {this.state.restaurant}</h2> : 
                    <h2 className='infoText'>You choose {this.state.restaurant}</h2> : 
                    <span/> : 
                    <><h2 className='infoText'>You're All Done!</h2>
                    <button  className="contentButton" onClick={(e) => this.onSubmit(e, data)}>Submit Selections</button></>}
                </div>
            </div>
        </div>
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {    
        submitMealMatch: data => dispatch(submitMealMatch(data)),
        sendText: data => dispatch(sendText(data)),
        homePage: () => dispatch(homePage())
    }
  }

const mapStateToProps = (state) => {
    return {  
        cardsOut: state.user.info.outgoingMealMatch,
        cardsIn: state.user.info.incomingMealMatch,
        friends: state.friendReducer.info.allFriends,
        username: state.user.info.username
    }
}

SwipePage.propTypes = {
    submitMealMatch: PropTypes.func.isRequired,
    sendText: PropTypes.func.isRequired,
    homePage: PropTypes.func.isRequired,
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SwipePage);
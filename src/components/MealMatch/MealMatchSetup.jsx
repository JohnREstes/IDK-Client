import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { yelpResults, mealMatchRequest } from '../../actions/mealMatch'
import RestaurantCarousel from '../carousel/carousel'
import cuisineTypes from '../../actions/cuisineTypes'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Modal from '../Modal/Modal'
import { swipePage } from '../../actions/pageDisplayed'
import { sendText } from '../../actions/generalActions'
import { getUser } from '../../actions/user'
import { customStyles } from './const'

class MealMatchSetup extends Component {

  constructor() {
    super()
    this.state = {
      zipOrCityState: '',
      displayResults: false,
      chooseCuisine: [],
      chooseFriends: [],
      numberOfResponses: '',
      modalToggle: false,
      appendedYelpResults: []
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.setCuisine = this.setCuisine.bind(this)
    this.setFriends = this.setFriends.bind(this)
  }

  onChange(e) {
    this.setState({ 
        [e.target.name]: e.target.value
     })
  }

  setCuisine(e) {
    this.setState({
      chooseCuisine: e
    })
  }

  setFriends(e) {
    console.log(e);
    this.setState({
      chooseFriends: e
    })
  }

  modalHandler = (e) => {
    e.preventDefault();
    this.setState({
      modalToggle: !this.state.modalToggle
    })
  }

  buildFriendsSelector(){
    let friendsList = this.props.friends
    let friendsJSON = [];
    for(let i = 0; i < friendsList.length; i++){
        let friendObject = {
            value: friendsList[i].cellphoneNumber,
            label: friendsList[i].username,
            _id: friendsList[i]._id
        }
        friendsJSON.push(friendObject)
    }
    return friendsJSON
  } 

  appendYelpResults(data) {
    console.log("cleaning data")
    console.log(data);
    const yelpResults = data.map(i => Object.assign(i, {selected: true}, {sender: this.props.username}, {modified: false}))
    console.log('these are your new results' + yelpResults);
    return (yelpResults)
  }

 onSubmit(e) {
    e.preventDefault();
      const yelpData= { 
        location: this.state.zipOrCityState,
        term: this.state.chooseCuisine[0].value,
      }
      this.props.yelpResults(yelpData);
      this.setState({
        displayResults: true
      })
  }

  onFriendSubmit(e) {
    e.preventDefault();
    if(this.state.chooseFriends.length < 1){
      alert("You must choose at least 1 friend!")
    }else{
    let data = [...this.props.yelpBusinesses];
    let appendedYelp = this.appendYelpResults(data)
      const mealMatchData = {
        mealMatch: appendedYelp,
        friend: this.state.chooseFriends
      }
    this.props.mealMatchRequest(mealMatchData);
    for(let i = 0; i < this.state.chooseFriends.length; i++){
      const textData = {
        body: `Hello ${this.state.chooseFriends[i].label}, ${this.props.username} has sent you a Meal Match!`,
        cellphoneNumber: `+1${this.state.chooseFriends[i].value}`
      }
      this.props.sendText(textData);
      alert("A Text Message has been sent to your Friend(s) with the pending Meal Match!")
    }
      this.props.swipePage();
  }}

  render() {
    var friendsJson = this.buildFriendsSelector();
    return (
        <div className="row">
        <div className="col-12 mx-auto">
            <div className="row">
                <div className="col-12 header-div text-center">
                    <h3>Search for Restaurants</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-12 header-div text-center">
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <input
                        placeholder=" Zip, or City, State" id="zipInput"
                        type="text" name="zipOrCityState"
                        value={this.state.zipOrCityState}
                        onChange={this.onChange}
                        required={true}
                        /><br></br>
                        <Select
                        styles={customStyles}
                        components={makeAnimated()}
                        onChange={this.setCuisine}
                        noOptionsMessage={() => 'No Cuisine selected!'}
                        placeholder="Select Cuisine"
                        isMulti
                        options = {cuisineTypes} />
                        <br></br>
                        <button type="submit" className="bouncy contentButton">
                            Create Meal Match
                        </button>
                    </form>
                </div>
            </div>
            <div className="row">
              {(this.state.displayResults) ?
                  <div className="col-12 mx-auto text-center">
                      <br></br>
                      <h4>Scroll to preview restaurants</h4>
                      <div className="demo-carousel max-width col-12 mx-auto">
                        <RestaurantCarousel businesses={this.props.yelpBusinesses}/>
                      </div>
                  <div className="col-12 text-center">
                  <button  className="contentButton" onClick={(e) => this.modalHandler(e)} >Select Meal Mates</button>
                  </div>
                  </div>
              : <div className="col-12"></div>}
              
              <Modal show={this.state.modalToggle}  modalClosed={this.modalHandler}>
                <div style={{color:'black'}}>
                  Invite your Meal Mates!
                <Select
                        components={makeAnimated()}
                        onChange={this.setFriends}
                        noOptionsMessage={() => 'No Friends selected!'}
                        placeholder="Select Friends"
                        isMulti
                        options = {friendsJson} />
                </div>
                <button  className="contentButton" onClick={(e) => this.onFriendSubmit(e)}>Send to Meal Mates</button>
              </Modal>
            </div>
        </div>
        </div>
    )
  }
}   

const mapDispatchToProps = dispatch => {
    return {    
      yelpResults: data => dispatch(yelpResults(data)),
      mealMatchRequest: data => dispatch(mealMatchRequest(data)),
      swipePage: () => dispatch(swipePage()),
      sendText: data => dispatch(sendText(data)),
      getUser: () => dispatch(getUser())
    }
  }

MealMatchSetup.propTypes = {
  yelpResults: PropTypes.func.isRequired,
  mealMatchRequest: PropTypes.func.isRequired,
  swipePage: PropTypes.func.isRequired,
  sendText: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  pageDisplayed: state.pageDisplayed.type ,
  yelpBusinesses: state.mealMatchReducer.info,
  friends: state.friendReducer.info.allFriends,
  username: state.user.info.username
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MealMatchSetup);
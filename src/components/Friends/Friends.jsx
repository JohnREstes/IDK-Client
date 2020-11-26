import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import { friendRequest, acceptFriend, declineFriend, removeFriend, cancelFriend } from "../../actions/friendActions";
import PropTypes from "prop-types";
import { stateUpdated } from "../../actions/generalActions";
import { getUser } from '../../actions/user'

class MyFriends extends Component {
  constructor() {
    super();
    this.state = {
      usernameOrEmailAddress: "",
      stateUpdatedLocal: false,
      didUpdate: false
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(){
    if(this.state.didUpdate){
        this.setState({
            stateUpdatedLocal: this.props.stateUpdatedBol
        })
        this.props.stateUpdated();
        this.setState({
            stateUpdatedLocal: this.props.stateUpdatedBol,
            didUpdate: false
        })
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.friendRequest(this.state.usernameOrEmailAddress);
    $('#requestInput').val("");
    this.setState({
      usernameOrEmailAddress: "",
      didUpdate: true
    })
  }

  onAccept(e) {
    this.props.acceptFriend(e.target.name);
    this.setState({
      didUpdate: true
    })
  }

  onDecline(e) {
    this.props.declineFriend(e.target.name);
    this.setState({
      didUpdate: true
    })
  }

  onRemove(e) {
    e.preventDefault();
    this.props.removeFriend(e.target.name);
    this.setState({
      didUpdate: true
    })
  }

  onCancel(e) {
    this.props.cancelFriend(e.target.name);
    this.setState({
      didUpdate: true
    })
  }

  removeFromFriend(){
    let removeFromfriendDiv = []
    if(this.props.friends.length === 0){
      removeFromfriendDiv = (<div className="card-body"><p>No friends yet! Request a friend above.</p></div>)
    }else{
      for(let i = 0; i < this.props.friends.length; i++){
        removeFromfriendDiv.push(
          <div className="card-body" key={`removeFromRequestIndex${i}`}>
              <div>
                <p>{this.props.friends[i]}
              <button
                className="left-margin"
                name={this.props.friends[i]}
                onClick={(e) => this.onRemove(e)}>Remove from friend
              </button></p>
              </div>
            </div>

        );
      }
    }
    return removeFromfriendDiv;
  }

  incomingFriendRequest(){
    let incomingfriendDiv = []
    if(this.props.incomingFriendRequests.length === 0){
      incomingfriendDiv = (<div className="card-body"><p>You have no friend requests</p></div>)
    }else{
      for(let i = 0; i < this.props.incomingFriendRequests.length; i++){
        incomingfriendDiv.push(
            <div className="card-body" key={`incomingRequestIndex${i}`}>
              <div>
                <p>{this.props.incomingFriendRequests[i]}
              <button
                className="left-margin"
                name={this.props.incomingFriendRequests[i]}
                onClick={(e) => this.onAccept(e)}>Accept friend
              </button>
              <button
                className="left-margin"
                name={this.props.incomingFriendRequests[i]}
                onClick={(e) => this.onDecline(e)}>Decline friend
              </button>
              </p>
              </div>
            </div>
        );
      }
    }
    return incomingfriendDiv;
  }

  outgoingFriendRequest(){
    let outgoingfriendDiv = []
    if(this.props.outgoingFriendRequests.length === 0){
      outgoingfriendDiv = (<div className="card-body"><p>You have no outgoing requests!</p></div>)
    }else{
      for(let i = 0; i < this.props.outgoingFriendRequests.length; i++){
        outgoingfriendDiv.push(
          <div className="card-body" key={`outgoingRequestIndex${i}`}>
              <div>
                <p>{this.props.outgoingFriendRequests[i]}
              <button
                className="left-margin"
                name={this.props.outgoingFriendRequests[i]}
                onClick={(e) => this.onCancel(e)}>Cancel friend Request
              </button></p>
              </div>
            </div>
        );
      }
    }
    return outgoingfriendDiv;
  }

  render() {
    return (
      <div className="col-12">
        <div>
          <h3 className="text-center">Find your Friends!</h3>
          <form id="form1" onSubmit={(e) => this.onSubmit(e)}>
            <p>Friend request:</p>
            <input
              type="text" id="requestInput" className="inputBox"
              name="usernameOrEmailAddress"
              placeholder="username or email address"
              value={this.state.usernameOrEmailAddress}
              onChange={(e) => this.onChange(e)}
            />
            <button id="submitButton" type="submit">Submit</button><br></br>
          </form>
          <div className="card buttonMargin">
            <div className="card-header"> Friends:</div>
            {this.removeFromFriend()}
          </div>
          <div className="card buttonMargin">
            <div className="card-header"> Incoming Requests:</div>
            {this.incomingFriendRequest()}
          </div>
          <div className="card buttonMargin">
            <div className="card-header"> Outbound Requests:</div>
            {this.outgoingFriendRequest()}
          </div>
          <div className="buttonMargin">
            
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    friendRequest: (data) => dispatch(friendRequest(data)),
    acceptFriend: (data) => dispatch(acceptFriend(data)),
    declineFriend: (data) => dispatch(declineFriend(data)),
    removeFriend: (data) => dispatch(removeFriend(data)),
    cancelFriend: (data) => dispatch(cancelFriend(data)),
    stateUpdated: () => dispatch(stateUpdated()),
    getUser: () => dispatch(getUser())
  };
};

const mapStateToProps = (state) => {
  return {
    username: state.user.info.username,
    incomingFriendRequests: state.user.info.incomingFriendRequests,
    outgoingFriendRequests: state.user.info.outgoingFriendRequests,
    friends: state.user.info.friends,
    stateUpdatedBol: state.stateUpdated
  };
};

MyFriends.propTypes = {
  friendRequest: PropTypes.func.isRequired,
  acceptFriend: PropTypes.func.isRequired,
  declineFriend: PropTypes.func.isRequired,
  removeFriend: PropTypes.func.isRequired,
  cancelFriend: PropTypes.func.isRequired,
  stateUpdated: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFriends);

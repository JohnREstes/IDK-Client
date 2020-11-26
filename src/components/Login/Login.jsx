import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createAccountPage } from '../../actions/pageDisplayed'
import { loginUser } from '../../actions/user'
import { updateFriends } from '../../actions/friendActions'


class Login extends Component {
  constructor() {
    super()
    this.state = {
    usernameOrEmailAddress: '',
      password: ''
    }

    this.handleUserChange = this.handleUserChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUserChange(event) {
    this.setState({ 
        usernameOrEmailAddress: event.target.value
     })
  }

  handlePasswordChange(event) {
    this.setState({ 
        password: event.target.value
     })
  }

  async handleSubmit(e) {
    e.preventDefault()
    const login = {  
          usernameOrEmailAddress: this.state.usernameOrEmailAddress, 
          password: this.state.password 
    }
    this.props.loginUser(login);
    this.props.updateFriends();
  }

  render() {
    return (
        <div className="row">
        <div className="col-12">
            <div className="row">
                <div className="col-12 header-div text-center">
                    <h3>Log in</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-12 header-div text-center">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <input
                        placeholder="Username or email address"
                        type="text"
                        value={this.state.usernameOrEmailAddress}
                        onChange={this.handleUserChange}
                        required={true}
                        autoComplete="on"
                        /><br></br>
                        <input
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        required={true}
                        autoComplete="current-password"
                        minLength="8" 
                        /><br></br>
                        <button type="submit" className="bouncy contentButton">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-12 header-div text-center">
                    <button onClick={() => this.props.createAccountPage()} className="contentButton">Create New Account</button>
                    
                    <p className="hidden red" id="invalid">Invalid login. Please try again.</p>
                </div>
            </div>
         </div>
        </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
    return {    
      createAccountPage: () => dispatch(createAccountPage()),
      loginUser: (data) => dispatch(loginUser(data)),
      updateFriends: () => dispatch(updateFriends())
    }
  }

const mapStateToProps = (state) => {
    return {  
        pageDisplayed: state.pageDisplayed.type,
    }
}

Login.propTypes = {
    createAccountPage: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    updateFriends:  PropTypes.func.isRequired,
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login);
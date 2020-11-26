import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import PropTypes from 'prop-types'
import { loginUserPage } from '../../actions/pageDisplayed'
import { createNewUser } from '../../actions/user'

class CreateAccount extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      emailAddress: '',
      password: '',
      passwordReenter: '',
      cellphoneNumber: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ 
        [e.target.name]: e.target.value
     })
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.password !== this.state.passwordReenter){
      $("#passwordMismatch").css('display', 'inline');
    }else{
      const newUserInfo = { 
        username: this.state.username,
        password: this.state.password,
        emailAddress: this.state.emailAddress,
        cellphoneNumber: this.state.cellphoneNumber
      }
        this.props.createNewUser(newUserInfo);
    }
  }

  render() {
    return (
        <div className="row">
        <div className="col-12">
            <div className="row">
                <div className="col-12 header-div text-center">
                    <h3>Create an IDK Account</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-12 header-div text-center">
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <input
                        placeholder="Username"
                        type="text" name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                        required={true}
                        /><br></br>
                        <input
                        placeholder="emailAddress"
                        type="text" name="emailAddress"
                        value={this.state.emailAddress}
                        onChange={this.onChange}
                        required={true}
                        /><br></br>
                        <input
                        placeholder="Password"
                        type="password" name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        required={true}
                        /><br></br>
                        <input
                        placeholder="Re-Enter Password"
                        type="password" name="passwordReenter"
                        value={this.state.passwordReenter}
                        onChange={this.onChange}
                        required={true}
                        /><br></br>
                        <input
                        placeholder="Cellphone Number 1234567890"
                        type="tel" name="cellphoneNumber"
                        pattern="[0-9]{10}"
                        value={this.state.cellphoneNumber}
                        onChange={this.onChange}
                        required={true}
                        />
                        <br></br>
                            <p id="passwordMismatch" className="hidden red">Passwords do not match!</p>
                        <br></br>
                        <button type="submit" className="bouncy contentButton">
                            Submit
                        </button>
                    </form>
                    <div className="col-12 header-div text-center">
                        <button  className="contentButton" onClick={() => this.props.loginUserPage()}>Cancel</button>
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
      loginUserPage: data => dispatch(loginUserPage(data)),
      createNewUser: data => dispatch(createNewUser(data))
    }
  }

CreateAccount.propTypes = {
  loginUserPage: PropTypes.func.isRequired,
  createNewUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  pageDisplayed: state.pageDisplayed.type 
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAccount);
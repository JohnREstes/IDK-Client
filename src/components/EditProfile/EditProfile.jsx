import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import PropTypes from "prop-types";
import { stateUpdated } from "../../actions/generalActions";
import { getUser, updateProfile } from '../../actions/user'

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
        emailAddress: "",
        cellphoneNumber: "",
        password: "",
        passwordReentered: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  emailSubmit(e){
    e.preventDefault();
        let userData = {
            type: "emailAddress",
            data: this.state.emailAddress
        }
        console.log(userData);
        this.props.updateProfile(userData);
        this.setState({
            emailAddress: ""
        })
        $("#emailAddress").val(''); 
    //}else{
        //$("#passwordMismatch").css('display', 'inline'); 
  }

  passwordSubmit(e){
      console.log("password submit")
    e.preventDefault();
    if(this.state.password === this.state.passwordReentered){
        $("#passwordMismatch").css('display', 'none');
        console.log("passwords match")
        let userData = {
            type: "password",
            data: this.state.password
        }
        console.log(userData);
        this.props.updateProfile(userData);
        this.setState({
            password: "",
            passwordReentered: "",
        })
        $("#password").val(''); 
        $("#passwordReentered").val(''); 
    }else{
        $("#passwordMismatch").css('display', 'inline');
    }
  }

  cellphoneSubmit(e){
    e.preventDefault();
        let userData = {
            type: "cellphoneNumber",
            data: this.state.cellphoneNumber
        }
        console.log(userData);
        this.props.updateProfile(userData);
        this.setState({
            cellphoneNumber: ""
        })
        $("#cellphoneNubmer").val(''); 
    //}else{
        //$("#passwordMismatch").css('display', 'inline'); 
  }

  render() {
    return (
      <div className="col-12">
        <div>
          <h3 className="text-center">Edit your Pertinents</h3>
          <div className="card buttonMargin">
            <div className="card-header"> Email:</div>
                <div className="card-body">
                    <p>Current Email : {this.props.userInfo.emailAddress}</p>
                    <form onSubmit={(e) => this.emailSubmit(e)}>
                        <input
                        type="text" id="emailAddress" className="inputBox"
                        name="emailAddress"
                        placeholder="email address"
                        value={this.emailAddress}
                        onChange={(e) => this.onChange(e)}
                        />
                        <button type="submit" >Submit</button><br></br>
                    </form> 
            </div>
          </div>
          <div className="card buttonMargin">
            <div className="card-header"> Password:</div>
            <div className="card-body">
                    <form onSubmit={(e) => this.passwordSubmit(e)}>
                        <input
                        type="password" id="password" className="inputBox"
                        name="password"
                        placeholder="password"
                        value={this.password}
                        onChange={(e) => this.onChange(e)}
                        minLength="8" 
                        required
                        />
                        <input
                        type="password" id="passwordReentered" className="inputBox"
                        name="passwordReentered"
                        placeholder="re-enter password"
                        value={this.passwordReentered}
                        onChange={(e) => this.onChange(e)}
                        minLength="8" 
                        required
                        />
                        <p className="hidden red" id="passwordMismatch">Passwords do not match!</p><br></br>
                        <button type="submit">Submit</button><br></br>
                    </form> 
            </div>
          </div>
          <div className="card buttonMargin">
            <div className="card-header"> Cellphone Number:</div>
            <div className="card-body">
                    <p>Current Cellphone Number : {this.props.userInfo.cellphoneNumber}</p>
                    <form onSubmit={(e) => this.cellphoneSubmit(e)}>
                        <input
                        type="text" id="cellphoneNubmer" className="inputBox"
                        name="cellphoneNumber"
                        placeholder="cellphone number"
                        pattern="[0-9]{10}"
                        value={this.cellphoneNumber}
                        onChange={(e) => this.onChange(e)}
                        />
                        <button type="submit">Submit</button><br></br>
                    </form> 
            </div>
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
    stateUpdated: () => dispatch(stateUpdated()),
    getUser: () => dispatch(getUser()),
    updateProfile: data => dispatch(updateProfile(data))
  };
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.info,
    stateUpdatedBol: state.stateUpdated
  };
};

EditProfile.propTypes = {
  stateUpdated: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

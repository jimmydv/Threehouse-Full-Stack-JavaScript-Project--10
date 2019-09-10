import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

class UserSignUp extends Component {
    
    state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      errors:"",
      errorsPassword:""
    }
    //set the values into state
    handleChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
          [name]: value
      })
      
    }
 
    handleConfirmPassword = (event) => {
      if (event.target.value !== this.state.password){
        this.setState({
          errorsPassword:"Passwords do not match!"
        })
      }else{
        this.setState({
          errorsPassword:""
        })
      }
      this.setState({confirmPassword: event.target.value})
    }

    //Redirect to the default page on click
    handleCancel = () => {
      this.props.history.push('/');
    }
    //Submit the user body to server on click
    handleSubmit = (event) => {
      event.preventDefault();
      const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword
      } = this.state;
      const { from } = this.props.location.state || { from: { pathname: '/courses/create' } };
      axios.post('http://localhost:5000/api/users', {firstName, lastName, emailAddress,password, confirmPassword})
        .then(() => {
          const context = this.props.context;
          context.actions.signIn(
              this.state.emailAddress, 
              this.state.password
          ).then((user) => {
            if(user.status === 200){
              this.props.history.push(from);
            }
          })
        }).catch((err) => {
          this.setState({
            errors: err.response.data.errors 
          })
        })
    }

    render() {
        return (
          <div className="bounds">
            <div className="grid-33 centered signin">
              {
                this.state.errors ? (
                  <div>
                      <h2 className="validation--errors--label">Validation errors</h2>
                          <div className="validation-errors">
                              <ul>
                                  {
                                      this.state.errors.map((error) => {
                                          return <li key={error}>{error}</li>
                                      })
                                  }
                              </ul>
                          </div>
                      </div>
                  ) :  null                          
              }
              {
                this.state.errorsPassword ? (
                  <div>
                      <h2 className="validation--errors--label">Validation errors</h2>
                          <div className="validation-errors">
                              <ul>
                                 <li>{this.state.errorsPassword}</li>
                              </ul>
                          </div>
                  </div>
                ) : null
              }
              <h1>Sign Up</h1>
              <div>
                <form>
                    <div>
                      <input 
                        id="firstName" 
                        name="firstName" 
                        type="text" 
                        className="" 
                        placeholder="First Name" 
                        onChange= {this.handleChange}
                        value={this.state.firstName}
                      />
                    </div>
                    <div>
                      <input 
                        id="lastName" 
                        name="lastName" 
                        type="text" 
                        className="" 
                        placeholder="Last Name" 
                        onChange= {this.handleChange}
                        value={this.state.lastName}
                      />
                    </div>
                    <div>
                      <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="text" 
                        className="" 
                        placeholder="Email Address" 
                        onChange= {this.handleChange}
                        value={this.state.emailAddress}
                      />
                    </div>
                    <div>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            className="" 
                            placeholder="Password" 
                            onChange= {this.handleChange}
                            value={this.state.password}
                        />
                    </div>
                    <div>
                        <input 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        className="" 
                        placeholder="Confirm Password"
                        onChange= {this.handleConfirmPassword}
                        value={this.state.confirmPassword}
                      />
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button 
                            className="button" 
                            type="submit"
                            onClick={this.handleSubmit}
                        >
                            Sign Up
                        </button>
                        <button 
                            className="button button-secondary" 
                            onClick={this.handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
              </div>
                <p>&nbsp;</p>
                <p>Already have a user account? 
                  &nbsp; <Link to="/signin" className="a1"> Click here </Link> &nbsp;
                  to sign in 
                </p>
            </div>
        </div>
        )
    }
}

export default UserSignUp;
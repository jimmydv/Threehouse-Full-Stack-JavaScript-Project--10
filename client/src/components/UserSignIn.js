import React, { Component } from 'react'
import {Link} from 'react-router-dom';
class UserSignIn extends Component {

    state = {
        emailAddress: "",
        password: "",
        errors: ""
    }
    
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const context = this.props.context;
    
        const { source } = this.props.location.state || { source: { pathname: '/courses/create' } };
        context.actions.signIn(
            this.state.emailAddress, 
            this.state.password
        ).then((user) => {
          
            if(user.status === 200){
                this.props.history.push(source)
            }
        }).catch((err) => {
            this.setState({
                errors: err.response.data.message 
                
            })
            console.log(err.response.data.message);
        });

    }
 
    handleCancel = (event) => {
        event.preventDefault();
        this.props.history.push('/');
    }

    render() {
        const context = this.props.context;
        if(context.authUser){
            this.props.history.push('/');
        }
        return (
            <div>
                <hr />
                <div className="bounds">
                    <div className="grid-33 centered signin">
                    {
                        this.state.errors ? (
                            <div>
                                <h2 className="validation--errors--label">Validation errors</h2>
                                    <div className="validation-errors">
                                        <ul>
                                            {
                                                <li>{this.state.errors}</li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                        ) :  null
                    }
                    <h1>Sign In</h1>
                    <div>
                        <form>
                            <div>
                                <input 
                                    id="emailAddress" 
                                    name="emailAddress" 
                                    type="text" 
                                    className="" 
                                    placeholder="Email Address" 
                                    onChange={this.handleChange}
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
                                        onChange={this.handleChange}
                                        value={this.state.password}
                                    />
                                </div>
                                <div className="grid-100 pad-bottom">
                                    <button 
                                        className="button" 
                                        type="submit"
                                        onClick={this.handleSubmit}
                                    >
                                        Sign In
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
                    <p>Don't have a user account? 
                        Click 
                        &nbsp; <Link to="/signup" className="a1"> Click here </Link> &nbsp;
                        to sign in!
                    </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSignIn;
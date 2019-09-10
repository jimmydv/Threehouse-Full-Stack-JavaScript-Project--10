import React, { Component } from 'react';
import Cookies from 'js-cookie'; 
import axios from 'axios';

const Context = React.createContext(); //create context

export class Provider extends Component {

    state = {
        authUser: Cookies.getJSON('authUser') || "", //get the authenticatedUser if it exist 
        encodedCredentials: Cookies.getJSON('encodedCredentials') || '', //get the encoded cred
    }

    render() {
        const authUser = this.state.authUser;
        const encodedCredentials = this.state.encodedCredentials;
        const course = this.state.course;
        //define the value passed into provider, these are values and actions
        const value = {
            authUser,
            encodedCredentials,
            course,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            }
        }

        return (
            //pass the value into provider
            <Context.Provider value={value}>
                {this.props.children} {/*allow child components have access to the context*/}
            </Context.Provider>
        )
    }

    signIn = async (emailAddress, password) => {
        //encode the cred into base 64
        const encodedCredentials = btoa(`${emailAddress}:${password}`);
        //send the encoded to the server in a header
        const user = await axios.get('http://localhost:5000/api/users', {
            headers: {
                "Authorization": `Basic ${encodedCredentials}`,
                "Content-Type": "application/json; charset=utf-8"
            }
        })
        //set the sent back user and cred into a global state
        this.setState({
            authUser: user.data,
            encodedCredentials: encodedCredentials
        })
        //set the user and encoded into cookie, both are expired in a day
        Cookies.set("authUser", JSON.stringify(user.data), { expires: 1 });
        Cookies.set("encodedCredentials", JSON.stringify(encodedCredentials), { expires: 1 });
        return user;
    }
    //signout, clear states and cookies
    signOut = () => {
        this.setState({
            authUser: "", //reset the authUser
            encodedCredentials: ""
        })
        Cookies.remove('authUser'); //remove the cookies
        Cookies.remove('encodedCredentials');
    }
}

//export the consumer
export const Consumer = Context.Consumer;

//the following is a HOC that automatically subscribe the passed component to the actions and data
export default (Component) => {
    return (props) => {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        )
    }
}
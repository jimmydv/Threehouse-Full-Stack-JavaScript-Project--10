import React from 'react';
import { Link } from 'react-router-dom';


const Header = ({context , ...props}) => {
    return(
        <div className="header">
            <div className="bounds">
                <Link to="/" className="header--logo">
                <h1>
                    Courses       
                </h1>
                </Link>
                    {context.authUser ? (
                        <nav>
                        <span>
                            Welcome,
                            {context.authUser.firstName}
                            &nbsp;
                            {context.authUser.lastName} !
                            </span>
                            <Link to="/signout" className="signout">
                                <span className="a1">
                                    Sign Out
                                </span>
                            </Link>


                        </nav>
                    ) : (
                        <nav>
                            <Link to={{
                                pathname:"/signin",
                                state: {from: props.location},
                                className: "signin"
                            }}
                             >
                                <span className="a1">
                                    Sign in
                                </span>
                            </Link>
                            <Link to={{
                                pathname:"/signup",
                                state: {from: props.location},
                                className: "signup"
                            }}>
                                <span className="a1">   
                                Sign Up
                                </span>
                            </Link>
                        </nav>
                    )}
            </div>
        </div>
    )
}

export default Header;
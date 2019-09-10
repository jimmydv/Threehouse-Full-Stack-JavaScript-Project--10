import React from 'react';
import {Link} from 'react-router-dom';
export default () => {
    return (
        <div className="bounds">
            <Link to={`/`} className="button button-secondary a1" >
                Return to List
            </Link>
            <h1>Not Found</h1>
            <p>Sorry! We couldn't find the page you're looking for.</p>
        </div>
    )
}
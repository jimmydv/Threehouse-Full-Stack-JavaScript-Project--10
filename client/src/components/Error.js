import React from 'react';
import {Link} from 'react-router-dom';
export default () => {
    return (
        <div className="bounds">
            <Link to={`/`} className="button button-secondary a1" >
                Return to List
            </Link>
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
        </div>
    )
}
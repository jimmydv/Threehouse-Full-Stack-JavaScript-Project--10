import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
    return (
        <div className="bounds">
            <Link to={`/`} className="button button-secondary a1" >
                Return to List
            </Link>
            <h1>Forbidden</h1>
            <p>Oh oh! You can't access this page.</p>
        </div>
    )
}
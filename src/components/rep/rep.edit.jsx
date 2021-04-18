import React from 'react'

import authContext from '../../context/auth.context.js';

export default class RepEdit extends React.Component {
    static contextType = authContext;
    render(){
        return(
            <div>
                <p>RepEdit</p>
            </div>
        )
    }
} 
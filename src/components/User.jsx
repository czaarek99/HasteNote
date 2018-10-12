import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import "../styles/user.scss"

class User extends Component {
    render() {
        return (
            <div className="userData">
                <FontAwesomeIcon icon="user-circle" className="userIcon"/>
                <p className="username">{this.props.username}</p>
            </div>
        );
    }
}

export default User;
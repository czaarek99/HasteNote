import React, {Component} from 'react';
import "../styles/navbar.scss"
import User from "./User";

class Navbar extends Component {
    render() {
        return (
            <nav>
                <h1 className="mainHeader">
                    <a href="/" className="headerLink">hastenote</a>
                </h1>
                <User username="User"/>
            </nav>
        );
    }
}

export default Navbar;
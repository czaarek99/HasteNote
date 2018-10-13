import React, {Component} from 'react';
import "../styles/navbar.scss"
import User from "./User";

class Navbar extends Component {
    
    render() {
        let user = <React.Fragment/>;
        if(this.props.loggedIn) {
            user = <User username="User"/>;
        }
        
        return (
            <nav>
                <h1 className="mainHeader">
                    <a href="/" className="headerLink">hastenote</a>
                </h1>
                {user}
            </nav>
        );
    }
}

export default Navbar;
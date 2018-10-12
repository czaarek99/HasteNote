import React, {Component} from 'react';
import "../styles/navbar.scss"

class Navbar extends Component {
    render() {
        return (
            <nav>
                <a href="/">
                    <h1 className="mainHeader">hastenote</h1>
                </a>
            </nav>
        );
    }
}

export default Navbar;
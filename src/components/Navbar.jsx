import React, {Component} from 'react';
import "../styles/navbar.scss"

class Navbar extends Component {
    render() {
        return (
            <nav>
                <h1 className="mainHeader">HasteNote</h1>
            </nav>
        );
    }
}

export default Navbar;
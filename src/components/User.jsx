import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import "../styles/user.scss"
import Dropdown from "./Dropdown";
import {POSITION_BOTTOM} from "../js/noteSymbols";

const userDropdownOptions = [
    {
        name: "Log out",
        handleOnClick: () => {
        }
    },
    {
        name: "Settings",
        handleOnClick: () => {
        }
    }
];


class User extends Component {
    
    constructor(props) {
        super(props);
        
        this.userDataRef = React.createRef();
        this.state = {
            showDropdown: false
        }
    }
    
    render() {
        let dropdown = <React.Fragment/>;
        if (this.state.showDropdown) {
            const margins = {
                left: 0,
                right: 0,
                top: 10,
                bottom: 0
            };
            
            dropdown = <Dropdown parentElement={this.userDataRef.current}
                                 position={POSITION_BOTTOM}
                                 options={userDropdownOptions}
                                 onClose={this.handleDropdownClose}
                                 margins={margins}/>
        }
        
        return (
            <React.Fragment>
                {dropdown}
                <div className="userData" onClick={this.handleOnClick} ref={this.userDataRef}>
                    <FontAwesomeIcon icon="user-circle" className="userIcon"/>
                    <p className="username">{this.props.username}</p>
                </div>
            </React.Fragment>
        );
    }
    
    handleDropdownClose = () => {
        this.setState({
            showDropdown: false
        });
    };
    
    handleOnClick = () => {
        this.setState({
            showDropdown: true
        })
    };
}

export default User;
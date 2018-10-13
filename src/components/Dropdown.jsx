import React, {Component} from 'react';
import "../styles/dropdown.scss"
import onClickOutside from "react-onclickoutside"
import {POSITION_BOTTOM, POSITION_LEFT, POSITION_RIGHT, POSITION_TOP} from "../js/noteSymbols";

const HIDDEN_STYLES = {
    top: -999999,
    left: -999999
};

class Dropdown extends Component {
    
    constructor(props) {
        super(props);
        
        this.dropdownRef = React.createRef();
        this.state = {
            styles: HIDDEN_STYLES
        }
    }
    
    render() {
        return (
            <section onKeyDown={this.handleKeyDown}
                     className="dropdown"
                     ref={this.dropdownRef}
                     style={this.state.styles}>
                {this.getDropdownOptions()}
            </section>
        );
    }
    
    handleClickOutside = () => {
        this.close();
    };
    
    handleKeyDown = (event) => {
        if(event.key === "Escape") {
            this.close();
        }
    };
    
    close() {
        this.setState({
            styles: HIDDEN_STYLES
        });
        
        this.props.onClose();
    }
    
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
        
        const styles = {};
        const margins = this.props.margins;
        if (margins) {
            styles.marginLeft = margins.left;
            styles.marginRight = margins.right;
            styles.marginTop = margins.top;
            styles.marginRight = margins.right;
        }
        
        const dropdownElement = this.dropdownRef.current;
        const {parentElement, position} = this.props;
        const parentRect = parentElement.getBoundingClientRect();
        const dropdownRect = dropdownElement.getBoundingClientRect();
        
        //TODO: Implement other positions
        if (position === POSITION_BOTTOM) {
            styles.left = parentRect.left + parentRect.width / 2 - dropdownRect.width / 2;
            styles.top = parentRect.top + parentRect.height;
        } else if (position === POSITION_TOP) {
        
        } else if (position === POSITION_LEFT) {
        
        } else if (position === POSITION_RIGHT) {
        
        }
        
        this.setState({styles})
    }
    
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }
    
    getDropdownOptions = () => {
        return this.props.options.map((option) => {
            const handleOnClick = () => {
                option.handleOnClick();
                this.close();
            };
            
            return (
                <p className="dropdownOption" onClick={handleOnClick} key={option.name}>
                    {option.name}
                </p>
            )
        })
    }
}

export default onClickOutside(Dropdown);
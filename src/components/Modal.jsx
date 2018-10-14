import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import "../styles/modal.scss"

class Modal extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            show: true
        }
    }
    
    render() {
        const modalStyles = {
            display: "inherit"
        };
        
        if (!this.state.show) {
            modalStyles.display = "none";
        }
        
        return (
            <div className="modalContainer"
                 style={modalStyles}
                 onClick={this.handleOnClick}>
                
                <section className="modal">
                    <p className="modalTitle">{this.props.title}</p>
                    <FontAwesomeIcon icon="times"
                                     className="modalCloseButton"
                                     onClick={this.handleOnClose}/>
                    <div className="modalContents">
                        {this.props.children}
                    </div>
                    <button className="modalOkButton"
                            onClick={this.handleOnClose}>ok
                    </button>
                </section>
            </div>
        );
    }
    
    handleOnClick = (event) => {
        if (event.target === event.currentTarget) {
            this.handleOnClose();
        }
    };
    
    handleOnClose = () => {
        this.setState({
            show: false
        })
    }
}

export default Modal;
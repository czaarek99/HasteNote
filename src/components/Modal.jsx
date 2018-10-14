import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import "../styles/modal.scss"

const MODAL_FADE_TIME = 700;

class Modal extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            show: false,
            closed: false
        }
    }
    
    render() {
        const modalContainerStyles = {
            opacity: 0
        };
    
        const modalStyles = {};
        
        if (this.state.show) {
            modalContainerStyles.opacity = 1;
            modalStyles.transform = "translateY(0)";
        }
        
        if(this.state.closed) {
            modalContainerStyles.display = "none";
        }
        
        
        return (
            <div className="modalContainer"
                 style={modalContainerStyles}
                 onClick={this.handleOnClick}>
                
                <section className="modal" style={modalStyles}>
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
    
    updateShow(show) {
        this.setState({show});
    }
    
    componentDidMount() {
        window.requestAnimationFrame(() => {
            this.updateShow(true);
        });
    }
    
    handleOnClick = (event) => {
        if (this.state.show && event.target === event.currentTarget) {
            this.handleOnClose();
        }
    };
    
    handleOnClose = () => {
        this.updateShow(false);
        setTimeout(() => {
            this.setState({
                closed: true
            });
            
            if(this.props.onClose) {
                this.props.onClose();
            }
        }, MODAL_FADE_TIME);
    }
}

export default Modal;
import React, {Component} from 'react';
import "../styles/note.css"

class Note extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            mouseEntered: false
        }
    }
    
    render() {
        const {name, renaming} = this.props.note;
        
        let noteContainerContents = <p className="noteName">{name}</p>;
        if (renaming) {
            noteContainerContents = <React.Fragment>
                <input className="noteNameInput"
                       value={name}
                       onChange={this.handleNameChange}
                       onKeyDown={this.handleKeyDown}
                       autoFocus/>
            </React.Fragment>
        }
        
        return (
            <section className="noteContainer"
                     onClick={this.handleOnClick}
                     onMouseLeave={this.handleMouseLeave}
                     onMouseEnter={this.handleMouseEnter}>
                {noteContainerContents}
            </section>
        );
    }
    
    handleKeyDown = (event) => {
        if((event.key === "Enter" || event.key === "Escape")
            && this.props.note.renaming) {
            this.finishNameChange();
        }
    };
    
    handleOnClick = () => {
        if (!this.props.note.renaming) {
            this.props.handleOnClick()
        }
    };
    
    handleMouseEnter = () => {
        if (this.props.note.renaming) {
            this.setState({
                mouseEntered: true
            })
        }
    };
    
    handleMouseLeave = () => {
        if (this.props.note.renaming && this.state.mouseEntered) {
            this.finishNameChange();
        }
    };
    
    finishNameChange() {
        this.props.handleFinishNameChange();
        this.setState({
            mouseEntered: false
        })
    }
    
    handleNameChange = (event) => {
        this.props.handleNameChange(event);
    }
}

export default Note;
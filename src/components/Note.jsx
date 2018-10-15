import React, {Component} from 'react';
import "../styles/note.scss"
import onClickOutside from "react-onclickoutside"
import {ACTIVE_ACTION, STOP_RENAME_ACTION, UPDATE_NAME_ACTION} from "../js/noteSymbols";

const NOTE_NAME_MAX_LENGTH = 32;

class Note extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            mouseEntered: false
        }
    }
    
    render() {
        const {name, renaming, noteId, saving} = this.props.note;
        
        let noteContainerContents = <p className="noteName">{name}</p>;
        if(saving) {
            noteContainerContents = <p className="noteName">Saving...</p>
        } else if (renaming) {
            noteContainerContents = <React.Fragment>
                <input className="noteNameInput"
                       maxLength={NOTE_NAME_MAX_LENGTH}
                       value={name}
                       onChange={this.handleNameChange}
                       onKeyDown={this.handleReactKeyDown}
                       autoFocus/>
            </React.Fragment>
        }
        
        let noteContainerClasses = "noteContainer ";
        if (this.props.activeNote.noteId === noteId) {
            noteContainerClasses += "active";
        }
        
        return (
            <section className={noteContainerClasses}
                     onClick={this.handleOnClick}
                     onMouseLeave={this.handleMouseLeave}
                     onMouseEnter={this.handleMouseEnter}>
                {noteContainerContents}
            </section>
        );
    }
    
    componentDidMount() {
        document.addEventListener("keydown", this.handleDocumentKeyDown);
    }
    
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleDocumentKeyDown)
    }
    
    handleClickOutside = () => {
        this.finishNameChange();
    };
    
    handleDocumentKeyDown = (event) => {
        if (event.key === "Escape") {
            this.finishNameChange();
        }
    };
    
    handleReactKeyDown = (event) => {
        if (event.key === "Enter") {
            this.finishNameChange();
        }
    };
    
    handleOnClick = () => {
        if (!this.props.note.renaming) {
            this.props.handleNoteAction(ACTIVE_ACTION, this.props.note);
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
        if (this.state.mouseEntered) {
            this.finishNameChange();
        }
    };
    
    finishNameChange = () => {
        if (this.props.note.renaming) {
            this.props.handleNoteAction(STOP_RENAME_ACTION);
            this.setState({
                mouseEntered: false
            })
        }
    };
    
    handleNameChange = (event) => {
        this.props.handleNoteAction(UPDATE_NAME_ACTION, event.target.value);
    }
}

export default onClickOutside(Note);
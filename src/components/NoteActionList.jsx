import React, {Component} from 'react';
import NoteAction from "./NoteAction";
import {DELETE_ACTION, NO_ACTIVE_NOTE, RENAME_ACTION} from "../js/noteSymbols";
import "../styles/noteActionList.scss"

class NoteActionList extends Component {
    render() {
        let sectionClasses = "noteActionList ";
        if(!this.hasActiveNote()) {
            sectionClasses += "disabled"
        }
        
        return (
            <section className={sectionClasses}>
                {
                    this.makeNoteAction("trash", DELETE_ACTION)
                }
                {
                    this.makeNoteAction("pencil-alt", RENAME_ACTION)
                }
            </section>
        );
    }
    
    hasActiveNote() {
        return this.props.activeNote !== NO_ACTIVE_NOTE;
    }
    
    makeNoteAction(icon, action) {
        return (
            <NoteAction icon={icon} onAction={() => {
                this.handleNoteAction(action);
            }}/>
        )
    }
    
    handleNoteAction = (action) => {
        if(this.hasActiveNote()) {
            this.props.handleNoteAction(action);
        }
    };
}

export default NoteActionList;
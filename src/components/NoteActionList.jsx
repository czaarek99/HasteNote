import React, {Component} from 'react';
import NoteAction from "./NoteAction";
import {DELETE_ACTION, NO_ACTIVE_NOTE, RENAME_ACTION, SHARE_ACTION} from "../js/noteSymbols";
import "../styles/noteActionList.scss"

const actions = [
    {
        icon: "trash",
        action: DELETE_ACTION
    },
    {
        icon: "pencil-alt",
        action: RENAME_ACTION
    },
    {
        icon: "share-alt",
        action: SHARE_ACTION
    }
];

class NoteActionList extends Component {
    render() {
        let sectionClasses = "noteActionList ";
        if (!this.hasActiveNote()) {
            sectionClasses += "disabled"
        }
        
        return (
            <section className={sectionClasses}>
                {this.getNoteActions()}
            </section>
        );
    }
    
    hasActiveNote() {
        return this.props.activeNote !== NO_ACTIVE_NOTE;
    }
    
    getNoteActions() {
        return actions.map(({icon, action}) => {
            return (
                <NoteAction key={action.toString()} icon={icon} onAction={() => {
                    this.handleNoteAction(action);
                }}/>
            )
        })
    }
   
    handleNoteAction = (action) => {
        if (this.hasActiveNote()) {
            this.props.handleNoteAction(action);
        }
    };
}

export default NoteActionList;
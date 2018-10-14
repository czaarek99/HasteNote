import React, {Component} from 'react';
import NoteAction from "./NoteAction";
import {
    DELETE_ACTION,
    NO_ACTIVE_NOTE,
    SHARE_ACTION,
    START_RENAME_ACTION,
} from "../js/noteSymbols";
import "../styles/noteActionList.scss"

const actions = [
    {
        icon: "trash",
        action: DELETE_ACTION
    },
    {
        icon: "pencil-alt",
        action: START_RENAME_ACTION
    },
    {
        icon: "share-alt",
        action: SHARE_ACTION
    }
];

class NoteActionList extends Component {
    render() {
        let sectionClasses = "noteActionList ";
        if (this.props.activeNote === NO_ACTIVE_NOTE) {
            sectionClasses += "disabled"
        }
        
        return (
            <section className={sectionClasses}>
                {this.getNoteActions()}
            </section>
        );
    }
   
    getNoteActions() {
        return actions.map(({icon, action}) => {
            return (
                <NoteAction key={action.toString()} icon={icon} onAction={() => {
                    this.props.handleNoteAction(action);
                }}/>
            )
        })
    }
}

export default NoteActionList;
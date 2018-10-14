import React, {Component} from 'react';
import {actionsToJSX} from "./Action";
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
        action: DELETE_ACTION,
        title: "Delete note"
    },
    {
        icon: "pencil-alt",
        action: START_RENAME_ACTION,
        title: "Rename note"
    },
    {
        icon: "share-alt",
        action: SHARE_ACTION,
        title: "Share note"
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
                {actionsToJSX(actions, this.props.handleNoteAction)}
            </section>
        );
    }
}

export default NoteActionList;
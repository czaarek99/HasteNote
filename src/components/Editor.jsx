import React, {Component} from 'react';
import "../styles/editor.css"
import NoteAction from "./NoteAction";
import {DELETE_ACTION, EDIT_ACTION, NO_ACTIVE_NOTE} from "../js/noteSymbols";

class Editor extends Component {
    render() {
        let noteEditorContents;
        
        if (this.props.activeNote === NO_ACTIVE_NOTE) {
            noteEditorContents = (
                <div className="noNoteSelectedContainer">
                    <div className="noNoteSelected">
                        <p className="noNoteText">Select or create a new note to start editing!</p>
                        <button className="createNoteButton">Create note</button>
                    </div>
                </div>
            );
        } else {
            noteEditorContents = (
                <React.Fragment>
                    <textarea className="textEditorArea" placeholder="Start taking a note..."/>
                    <section className="noteActionList">
                        {
                            this.makeNoteAction("trash", DELETE_ACTION)
                        }
                        {
                            this.makeNoteAction("pencil", EDIT_ACTION)
                        }
                    </section>
                </React.Fragment>
            );
        }
        
        return (
            <section className="noteEditor">
                {noteEditorContents}
            </section>
        );
    }
    
    makeNoteAction(icon, action) {
        return (
            <NoteAction icon={icon} onAction={() => {
                this.handleNoteAction(action);
            }}/>
        )
    }
    
    handleNoteAction = (action) => {
        return this.props.handleNoteAction(action);
    }
}

export default Editor;
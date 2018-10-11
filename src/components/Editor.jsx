import React, {Component} from 'react';
import "../styles/editor.css"
import NoteAction from "./NoteAction";
import {DELETE_ACTION, RENAME_ACTION, NO_ACTIVE_NOTE} from "../js/noteSymbols";

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
                    <textarea className="textEditorArea"
                              placeholder="Start taking a note..."
                              value={this.props.contents}
                              onChange={this.handleNoteTyping}
                    />
                    <section className="noteActionList">
                        {
                            this.makeNoteAction("trash", DELETE_ACTION)
                        }
                        {
                            this.makeNoteAction("pencil", RENAME_ACTION)
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
        this.props.handleNoteAction(action);
    };
    
    handleNoteTyping = (event) => {
        this.props.handleNoteTyping(event);
    };
}

export default Editor;
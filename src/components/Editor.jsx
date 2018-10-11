import React, {Component} from 'react';
import "../styles/editor.css"
import {NO_ACTIVE_NOTE} from "../js/noteSymbols";

class Editor extends Component {
    
    render() {
        let noteEditorContents;
        
        if (this.props.activeNote === NO_ACTIVE_NOTE) {
            noteEditorContents = (
                <div className="noNoteSelectedContainer">
                    <div className="noNoteSelected">
                        <p className="noNoteText">Select or create a new note to start editing!</p>
                        <button className="createNoteButton"
                                onClick={this.props.addNewNote}>
                            Create note
                        </button>
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
                    
                </React.Fragment>
            );
        }
        
        return (
            <section className="noteEditor">
                {noteEditorContents}
            </section>
        );
    }
    
    handleNoteTyping = (event) => {
        this.props.handleNoteTyping(event);
    };
}

export default Editor;
import React, {Component} from 'react';
import Navbar from "./Navbar";
import NoteList from "./NoteList"
import Editor from "./Editor";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import '../styles/app.css';
import {DELETE_ACTION, NO_ACTIVE_NOTE, RENAME_ACTION} from "../js/noteSymbols";

library.add(faTrash);
library.add(faPencilAlt);

class App extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            notes: [
                {
                    id: 0,
                    name: "Testnote",
                    color: "blue",
                    contents: "hello there fam",
                    renaming: false
                },
                {
                    id: 1,
                    name: "Testnote2",
                    color: "yellow",
                    contents: "more content bruh",
                    renaming: false
                }
            ],
            activeNote: NO_ACTIVE_NOTE
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <Navbar/>
                <div className="appContainer">
                    <NoteList notes={this.state.notes}
                              activeNote={this.state.activeNote}
                              handleOnClick={this.handleNoteClick}
                              handleNameChange={this.handleNoteNameChange}
                              handleFinishNameChange={this.handleNoteFinishNameChange}/>
                    <Editor handleNoteAction={this.handleNoteAction}
                            handleNoteTyping={this.handleNoteTyping}
                            activeNote={this.state.activeNote}
                            contents={this.getActiveNoteContents()}/>
                </div>
            </React.Fragment>
        );
    }
    
    getActiveNoteContents() {
        const currentNote = this.state.activeNote;
        
        if (currentNote === NO_ACTIVE_NOTE) {
            return "";
        } else {
            return currentNote.contents;
        }
    }
    
    updateActiveNote(field, value) {
        const activeNote = this.state.activeNote;
        const notes = [...this.state.notes];
        const index = notes.indexOf(activeNote);
        const newNote = {...activeNote};
        notes[index] = newNote;
        notes[index][field] = value;
        this.setState({
            notes,
            activeNote: newNote
        });
    }
    
    handleNoteFinishNameChange = () => {
        this.updateActiveNote("renaming", false);
    };
    
    handleNoteNameChange = (event) => {
        this.updateActiveNote("name", event.target.value);
    };
    
    handleNoteTyping = (event) => {
        this.updateActiveNote("contents", event.target.value);
    };
    
    handleNoteClick = (note) => {
        this.setState({
            activeNote: note
        })
    };
    
    handleNoteAction = (action) => {
        if (action === DELETE_ACTION) {
            const notes = this.state.notes.filter((note) => {
                return note.id !== this.state.activeNote.id;
            });
            
            this.setState({
                notes,
                activeNote: NO_ACTIVE_NOTE
            });
        } else if (action === RENAME_ACTION) {
            const prevRenamingValue = this.state.activeNote.renaming;
            this.updateActiveNote("renaming", !prevRenamingValue);
        }
    }
}

export default App;

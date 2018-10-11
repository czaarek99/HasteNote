import React, {Component} from 'react';
import Navbar from "./Navbar";
import NoteList from "./NoteList"
import Editor from "./Editor";
import '../styles/app.css';
import {DELETE_ACTION, NO_ACTIVE_NOTE} from "../js/noteSymbols";

class App extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            notes: [
                {
                    id: 0,
                    name: "Testnote",
                    color: "blue",
                    contents: "hello there fam"
                },
                {
                    id: 1,
                    name: "Testnote2",
                    color: "yellow",
                    contents: "more content bruh"
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
                              handleOnClick={this.handleNoteClick}/>
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
    
    handleNoteTyping = (event) => {
        const activeNote = this.state.activeNote;
        const notes = [...this.state.notes];
        const index = notes.indexOf(activeNote);
        const newNote = {...activeNote};
        notes[index] = newNote;
        notes[index].contents = event.target.value;
        this.setState({
            notes,
            activeNote: newNote
        });
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
        }
    }
}

export default App;

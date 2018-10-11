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
                    color: "blue"
                },
                {
                    id: 1,
                    name: "Testnote2",
                    color: "yellow"
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
                              activeNote={this.state.activeNote}/>
                    <Editor handleNoteAction={this.handleNoteAction}
                            activeNote={this.state.activeNote}/>
                </div>
            </React.Fragment>
        );
    }
    
    handleNoteAction = (action) => {
        if (action === DELETE_ACTION) {
            const notes = this.state.notes.filter((note) => {
                return note.id !== this.state.activeNote;
            });
            
            this.setState({
                notes,
                activeNote: NO_ACTIVE_NOTE
            });
        }
    }
}

export default App;

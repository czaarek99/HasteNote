import React, {Component} from 'react';
import Navbar from "./Navbar";
import NoteList from "./NoteList"
import Editor from "./Editor";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrash, faPencilAlt, faPlus, faShareAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import {DELETE_ACTION, NO_ACTIVE_NOTE, RENAME_ACTION} from "../js/noteSymbols";
import randomString from 'randomstring-promise';
import '../styles/app.scss';
import NoteActionList from "./NoteActionList";
import {withCookies} from "react-cookie";
import UserLogin from "./UserLogin";

library.add(faTrash);
library.add(faPencilAlt);
library.add(faPlus);
library.add(faShareAlt);
library.add(faUserCircle);

class App extends Component {
    
    constructor(props) {
        super(props);
        
        const {cookies} = props;
        
        this.state = {
            notes: [],
            activeNote: NO_ACTIVE_NOTE,
            loggedIn: cookies.get("loggedIn") === "true"
        }
    }
    
    render() {
        let pageContents;
        if (this.state.loggedIn) {
            pageContents = <React.Fragment>
                <NoteList notes={this.state.notes}
                          activeNote={this.state.activeNote}
                          handleOnClick={this.handleNoteClick}
                          handleNameChange={this.handleNoteNameChange}
                          handleFinishNameChange={this.handleNoteFinishNameChange}/>
                
                <div className="createNoteButton2" onClick={this.addNewNote}>
                    <FontAwesomeIcon className="createNoteIcon" icon="plus" size="2x" title="Add new note"/>
                </div>
                <Editor handleNoteTyping={this.handleNoteTyping}
                        activeNote={this.state.activeNote}
                        addNewNote={this.addNewNote}
                        contents={this.getActiveNoteContents()}/>
                <NoteActionList handleNoteAction={this.handleNoteAction}
                                activeNote={this.state.activeNote}/>
            </React.Fragment>
        } else {
            pageContents = <UserLogin/>
        }
        
        const username = this.props.cookies.get("username");
        return (
            <React.Fragment>
                <Navbar loggedIn={this.state.loggedIn} username={username}/>
                {pageContents}
            </React.Fragment>
        );
    }
    
    addNewNote = () => {
        const notes = [...this.state.notes];
        
        randomString(16, "alphanumeric").then((id) => {
            const note = {
                id: id,
                name: "Unnamed",
                color: "white",
                renaming: true
            };
            
            notes.forEach((note) => {
                note.renaming = false;
            });
            
            notes.push(note);
            this.setState({
                notes,
                activeNote: note
            });
        })
    };
    
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

export default withCookies(App);

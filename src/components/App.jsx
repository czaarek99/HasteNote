import React, {Component} from 'react';
import Navbar from "./Navbar";
import NoteList from "./NoteList"
import Editor from "./Editor";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrash, faPencilAlt, faPlus, faShareAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import randomString from 'randomstring-promise';
import '../styles/app.scss';
import NoteActionList from "./NoteActionList";
import {withCookies} from "react-cookie";
import UserLogin from "./UserLogin";
import {
    ACTIVE_ACTION,
    DELETE_ACTION,
    NO_ACTIVE_NOTE,
    START_RENAME_ACTION,
    STOP_RENAME_ACTION,
    UPDATE_CONTENT_ACTION,
    UPDATE_NAME_ACTION
} from "../js/noteSymbols";

library.add(faTrash);
library.add(faPencilAlt);
library.add(faPlus);
library.add(faShareAlt);
library.add(faUserCircle);

//TODO: Show errors if fetch() for some reason fails in the background
class App extends Component {
    
    constructor(props) {
        super(props);
        
        const {cookies} = props;
        
        this.state = {
            notes: [],
            activeNote: NO_ACTIVE_NOTE,
            loggedIn: cookies.get("loggedIn") === "true",
            loadingNotes: true
        };
        
        this.handleNoteAction = this.handleNoteAction.bind(this);
        this.sendContentsToServerTimeout = null;
    }
    
    render() {
        let pageContents;
        if (!this.state.loggedIn) {
            pageContents = <UserLogin/>
        } else if (this.state.loadingNotes) {
            //TODO: Add some kind of animation here to let the user know we're working on it
            pageContents = <section className="notesLoading fillGrid">
                <p className="notesLoadingText">
                    Please wait while your notes are being loaded...
                </p>
            </section>
        } else {
            pageContents = <React.Fragment>
                <NoteList notes={this.state.notes}
                          activeNote={this.state.activeNote}
                          handleNoteAction={this.handleNoteAction}/>
                
                <div className="createNoteButton2" onClick={this.addNewNote}>
                    <FontAwesomeIcon className="createNoteIcon" icon="plus" size="2x" title="Add new note"/>
                </div>
                <Editor handleNoteAction={this.handleNoteAction}
                        activeNote={this.state.activeNote}
                        addNewNote={this.addNewNote}
                        contents={this.getActiveNoteContents()}/>
                <NoteActionList handleNoteAction={this.handleNoteAction}
                                activeNote={this.state.activeNote}/>
            </React.Fragment>
        }
        
        const username = this.props.cookies.get("username");
        return (
            <React.Fragment>
                <Navbar loggedIn={this.state.loggedIn} username={username}/>
                {pageContents}
            </React.Fragment>
        );
    }
    
    componentDidMount() {
        this.fetchNotes();
    }
    
    async fetchNotes() {
        const response = await fetch("/note/all", {
            credentials: "include",
        });
        
        if (response.status === 200) {
            const notes = await response.json();
            const state = {...this.state};
            state.loadingNotes = false;
            state.notes = notes;
            this.setState(state);
        } else {
            const responseText = await response.text();
            console.log("Loading notes error: " + responseText);
        }
    }
    
    addNewNote = async () => {
        const notes = [...this.state.notes];
        
        const noteId = await randomString(16, "alphanumeric");
        const note = {
            name: "Unnamed",
            color: "white",
            renaming: true,
            noteId
        };
        
        notes.forEach((note) => {
            note.renaming = false;
        });
        
        notes.push(note);
        this.setState({
            notes,
            activeNote: note
        });
        
        const body = new URLSearchParams();
        body.set("noteId", noteId);
        
        const response = await fetch("/note", {
            method: "PUT",
            credentials: "include",
            body
        });
        
        if (response.status !== 200) {
            const responseText = await response.text();
            console.log("Failed to create new note with error: " + responseText);
        }
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
    
    handleNoteAction = async (action, data) => {
        const activeNoteId = this.state.activeNote.noteId;
        
        if (action === ACTIVE_ACTION) {
            const state = {...this.state};
            state.activeNote = data;
            this.setState(state);
        }
        
        if (activeNoteId !== NO_ACTIVE_NOTE) {
            const body = new URLSearchParams();
            body.append("noteId", activeNoteId);
            
            if (action === DELETE_ACTION) {
                const notes = this.state.notes.filter((note) => {
                    return note.noteId !== activeNoteId;
                });
                
                this.setState({
                    notes,
                    activeNote: NO_ACTIVE_NOTE
                });
                
                const response = await fetch("/note", {
                    method: "DELETE",
                    credentials: "include",
                    body
                });
                
                if (response.status !== 200) {
                    const responseText = await response.text();
                    console.log("Failed to delete note with error: " + responseText);
                }
            } else if (action === START_RENAME_ACTION) {
                this.updateActiveNote("renaming", true);
            } else if (action === STOP_RENAME_ACTION) {
                //TODO: Error on empty note name
                const {name} = this.state.activeNote;
                this.updateActiveNote("renaming", false);
                
                body.set("name", name);
                const response = await fetch("/note/name", {
                    method: "PATCH",
                    credentials: "include",
                    body
                });
                
                if (response.status !== 200) {
                    const responseText = await response.text();
                    console.log("Failed to rename note with error: " + responseText);
                }
            } else if (action === UPDATE_NAME_ACTION) {
                this.updateActiveNote("name", data);
            } else if (action === UPDATE_CONTENT_ACTION) {
                this.updateActiveNote("contents", data);
                
                clearTimeout(this.sendContentsToServerTimeout);
                this.sendContentsToServerTimeout = setTimeout(() => {
                    this.sendContentsToServer();
                }, 1000);
            }
        }
    };
    
    async sendContentsToServer() {
        //TODO: Add saving indicator
        console.log("Sending contents!");
        const {noteId, contents} = this.state.activeNote;
        
        const body = new URLSearchParams();
        body.append("noteId", noteId);
        body.append("contents", contents);
        
        const response = await fetch("/note/contents", {
            method: "PATCH",
            credentials: "include",
            body
        });
        
        if (response.status !== 200) {
            const responseText = await response.text();
            console.log("Failed to update note contents with error: " + responseText);
        }
    }
}

export default withCookies(App);

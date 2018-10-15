import React, {Component} from 'react';
import Navbar from "./Navbar";
import NoteList from "./NoteList"
import Editor from "./Editor";
import {library} from '@fortawesome/fontawesome-svg-core'
import randomString from 'randomstring-promise';
import '../styles/app.scss';
import NoteActionList from "./NoteActionList";
import {withCookies} from "react-cookie";
import UserLogin from "./UserLogin";
import Modal from "./Modal";
import {
    ACTIVE_ACTION, ADD_NEW_NOTE_ACTION, CLOSE_SIDEBAR_ACTION,
    DELETE_ACTION,
    NO_ACTIVE_NOTE, OPEN_SIDEBAR_ACTION,
    START_RENAME_ACTION,
    STOP_RENAME_ACTION,
    UPDATE_CONTENT_ACTION,
    UPDATE_NAME_ACTION
} from "../js/noteSymbols";
import {
    faTrash,
    faPencilAlt,
    faPlus,
    faShareAlt,
    faUserCircle,
    faTimes,
    faBars
} from '@fortawesome/free-solid-svg-icons'
import LoadingGrid from "./LoadingGrid";
import AppActionList from "./AppActionList";

library.add(faTrash);
library.add(faPencilAlt);
library.add(faPlus);
library.add(faShareAlt);
library.add(faUserCircle);
library.add(faTimes);
library.add(faBars);

//TODO: Implement note sharing
//TODO: Limit notes to a logical amount
class App extends Component {
    
    constructor(props) {
        super(props);
        
        const {cookies} = props;
        
        this.state = {
            notes: [],
            activeNote: NO_ACTIVE_NOTE,
            loggedIn: cookies.get("loggedIn") === "true",
            loadingNotes: true,
            error: null,
            sidebarOpen: false
        };
        
        this.handleNoteAction = this.handleNoteAction.bind(this);
        this.sendContentsToServerTimeout = null;
    }
    
    render() {
        let pageContents;
        if (!this.state.loggedIn) {
            pageContents = <UserLogin/>
        } else if (this.state.loadingNotes) {
            pageContents = <section className="notesLoading fillGrid">
                <LoadingGrid/>
                <p className="notesLoadingText">
                    Please wait while your notes are being loaded...
                </p>
            </section>
        } else {
            pageContents = <React.Fragment>
                <NoteList notes={this.state.notes}
                          open={this.state.sidebarOpen}
                          activeNote={this.state.activeNote}
                          handleNoteAction={this.handleNoteAction}/>
                <Editor handleNoteAction={this.handleNoteAction}
                        activeNote={this.state.activeNote}
                        addNewNote={() => {
                            this.handleAppAction(ADD_NEW_NOTE_ACTION)
                        }}
                        contents={this.getActiveNoteContents()}/>
                <AppActionList handleAppAction={this.handleAppAction}/>
                <NoteActionList handleNoteAction={this.handleNoteAction}
                                activeNote={this.state.activeNote}/>
            </React.Fragment>
        }
        
        let errorModal = <React.Fragment/>;
        if (this.state.error !== null) {
            errorModal = <Modal title="Error">
                <p className="errorText">{this.state.error}</p>
            </Modal>;
        }
        
        const username = this.props.cookies.get("username");
        return (
            <React.Fragment>
                <Navbar loggedIn={this.state.loggedIn} username={username}/>
                {pageContents}
                {errorModal}
            </React.Fragment>
        );
    }
    
    componentDidMount() {
        if (this.state.loggedIn) {
            this.fetchNotes();
        }
    }
    
    showError(message) {
        this.setState({
            error: message
        })
    }
    
    async showFetchError(response, what) {
        const responseText = await response.text();
        this.showError(`Error on note ${what} with message: ${responseText}`);
    }
    
    async fetchNotes() {
        const response = await fetch("/note/all", {
            credentials: "include",
        });
        
        if (response.ok) {
            const dbNotes = await response.json();
            const notes = [];
            for (const note of dbNotes) {
                note.renaming = false;
                note.saving = false;
                notes.push(note);
            }
            
            this.setState({
                notes,
                loadingNotes: false
            });
        } else {
            await this.showFetchError(response, "load");
        }
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
        const notes = [...this.state.notes];
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            
            if (note.noteId === this.state.activeNote.noteId) {
                const newNote = {...note};
                newNote[field] = value;
                notes[i] = newNote;
                
                return this.setState({
                    notes,
                    activeNote: newNote
                });
            }
        }
        
        throw new Error("No note with that id");
    }
    
    updateNote(noteId, field, value) {
        const notes = [...this.state.notes];
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            
            if (note.noteId === noteId) {
                notes[i] = {...note};
                notes[i][field] = value;
                
                return this.setState({notes});
            }
        }
        
        throw new Error("No note with that id");
    }
    
    handleAppAction = async (action) => {
        if (action === ADD_NEW_NOTE_ACTION) {
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
                activeNote: note,
                sidebarOpen: true
            });
            
            const body = new URLSearchParams();
            body.set("noteId", noteId);
            
            const response = await fetch("/note", {
                method: "PUT",
                credentials: "include",
                body
            });
            
            if (!response.ok) {
                await this.showFetchError(response, "add");
            }
        } else if (action === CLOSE_SIDEBAR_ACTION) {
            this.setState({
                sidebarOpen: false
            })
        } else if (action === OPEN_SIDEBAR_ACTION) {
            this.setState({
                sidebarOpen: true
            })
        }
    };
    
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
                
                if (!response.ok) {
                    await this.showFetchError(response, "delete");
                }
            } else if (action === START_RENAME_ACTION) {
                this.updateActiveNote("renaming", true);
            } else if (action === STOP_RENAME_ACTION) {
                const {name} = this.state.activeNote;
                
                this.updateActiveNote("renaming", false);
                
                body.set("name", name);
                const response = await fetch("/note/name", {
                    method: "PATCH",
                    credentials: "include",
                    body
                });
                
                if (!response.ok) {
                    await this.showFetchError(response, "rename");
                }
            } else if (action === UPDATE_NAME_ACTION) {
                this.updateActiveNote("name", data);
            } else if (action === UPDATE_CONTENT_ACTION) {
                const {contents, noteId} = data;
                this.updateActiveNote("contents", contents);
                
                clearTimeout(this.sendContentsToServerTimeout);
                this.sendContentsToServerTimeout = setTimeout(() => {
                    this.updateNote(noteId, "saving", true);
                    this.sendContentsToServer(noteId, contents);
                }, 1000);
            }
        }
    };
    
    async sendContentsToServer(noteId, contents) {
        console.log("Sent contents for: " + noteId);
        
        //this.updateActiveNote("edited", false);
        const body = new URLSearchParams();
        body.append("noteId", noteId);
        body.append("contents", contents);
        
        const response = await fetch("/note/contents", {
            method: "PATCH",
            credentials: "include",
            body
        });
        
        if (response.ok) {
            /*
            If the user has a really fast connection to the server
            we delay the display since we don't want to just flash
            the word "Saving".
             */
            setTimeout(() => {
                this.updateNote(noteId, "saving", false);
            }, 500)
        } else {
            await this.showFetchError(response, "update content");
        }
    }
}

export default withCookies(App);

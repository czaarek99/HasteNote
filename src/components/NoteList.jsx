import React, {Component} from 'react';
import "../styles/noteList.scss"
import Note from "./Note";

class NoteList extends Component {
    render() {
        let classNames = "noteList ";
        if(this.props.open) {
            classNames += "open";
        }
        
        return (
            <div className={classNames}>
                {this.getNoteList()}
            </div>
        );
    }
    
    getNoteList() {
        const notes = this.props.notes;
        if (notes.length === 0) {
            return (
                <section className="noNotes">
                    <p className="noNotesText">
                        Click the plus button below to add your first note!
                    </p>
                </section>
            )
        } else {
            return this.props.notes.map((note) => {
                return <Note note={note}
                             key={note.noteId}
                             activeNote={this.props.activeNote}
                             handleNoteAction={this.props.handleNoteAction}
                />
            });
        }
    }
}

export default NoteList;
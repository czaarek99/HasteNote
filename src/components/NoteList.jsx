import React, {Component} from 'react';
import "../styles/noteList.css"
import Note from "./Note";

class NoteList extends Component {
    render() {
        return (
            <div className="noteList">
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
                             key={note.id}
                             activeNote={this.props.activeNote}
                             handleNameChange={this.props.handleNameChange}
                             handleFinishNameChange={this.props.handleFinishNameChange}
                             handleOnClick={() => {
                                 this.props.handleOnClick(note)
                             }}
                />
            });
        }
    }
}

export default NoteList;
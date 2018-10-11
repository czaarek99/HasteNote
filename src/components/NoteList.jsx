import React, {Component} from 'react';
import "../styles/list.css"
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
        return this.props.notes.map((note) => {
            return <Note note={note}
                         key={note.id}
                         handleOnClick= {
                             () => {
                                 this.props.handleOnClick(note)
                             }
                         }
                         handleNameChange={this.props.handleNameChange}
                         handleFinishNameChange={this.props.handleFinishNameChange}
            />
        })
    }
}

export default NoteList;
import React, {Component} from 'react';
import "../styles/list.css"
import Note from "./Note";

class NoteList extends Component {
    render() {
        return (
            <div className="noteList">
                <Note noteName="Testnote" color="blue"/>
                <Note noteName="Testnote2" color="blue"/>
            </div>
        );
    }
}

export default NoteList;
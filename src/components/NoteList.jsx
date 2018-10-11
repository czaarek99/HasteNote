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
        return this.props.notes.map(({name, color, id}) => {
            return <Note noteName={name} color={color} key={id}/>
        })
    }
}

export default NoteList;
import React, {Component} from 'react';
import "../styles/note.css"

class Note extends Component {
    render() {
        return (
            <div className="noteContainer">
                <p className="noteName">{this.props.noteName}</p>
            </div>
        );
    }
}

export default Note;
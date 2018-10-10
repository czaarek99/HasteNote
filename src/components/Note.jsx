import React, {Component} from 'react';
import "../styles/note.css"

class Note extends Component {
    render() {
        return (
            <section className="noteContainer">
                <p className="noteName">{this.props.noteName}</p>
            </section>
        );
    }
}

export default Note;
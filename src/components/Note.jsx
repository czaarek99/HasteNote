import React, {Component} from 'react';
import "../styles/note.css"

class Note extends Component {
    render() {
        return (
            <section className="noteContainer" onClick={this.props.handleOnClick}>
                <p className="noteName">{this.props.noteName}</p>
            </section>
        );
    }
}

export default Note;
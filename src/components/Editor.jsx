import React, {Component} from 'react';
import "../styles/editor.css"

class Editor extends Component {
    render() {
        return (
            <section className="noteEditor">
                <textarea className="textEditorArea" placeholder="Start taking a note..."/>
                <section className="noteActionList">
                
                </section>
            </section>
        );
    }
}

export default Editor;
import React, {Component} from 'react';
import "../styles/editor.css"

class Editor extends Component {
    render() {
        return (
            <div className="noteEditor">
                <textarea className="textEditorArea" placeholder="Start taking a note..."/>
            </div>
        );
    }
}

export default Editor;
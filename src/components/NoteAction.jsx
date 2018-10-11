import React, {Component} from 'react';
import "../styles/noteAction.css"

class NoteAction extends Component {
    render() {
        const iconSrc = `png/${this.props.icon}.png`;
    
        return (
            <div onClick={this.props.onAction}>
                <img src={iconSrc} className="noteActionIcon" alt=""/>
            </div>
        );
    }
}

export default NoteAction;
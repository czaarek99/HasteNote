import React, {Component} from 'react';
import "../styles/noteAction.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class NoteAction extends Component {
    render() {
        return (
            <div className="noteAction" onClick={this.props.onAction}>
                <FontAwesomeIcon icon={this.props.icon} size="2x" className="noteActionIcon"/>
            </div>
        );
    }
}

export default NoteAction;
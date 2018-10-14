import React, {Component} from 'react';
import "../styles/action.scss"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class Action extends Component {
    render() {
        return (
            <div className="action" onClick={this.props.onAction}>
                <FontAwesomeIcon icon={this.props.icon} size="2x" className="actionIcon"/>
            </div>
        );
    }
}

export default Action;

export function actionsToJSX(actions, handleAction) {
    return actions.map(({icon, action}) => {
        return (
            <Action key={action.toString()} icon={icon} onAction={() => {
                handleAction(action);
            }}/>
        )
    })
}

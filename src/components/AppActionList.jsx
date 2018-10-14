import React, {Component} from 'react';
import {ADD_NEW_NOTE_ACTION, CLOSE_SIDEBAR_ACTION, OPEN_SIDEBAR_ACTION} from "../js/noteSymbols";
import {actionsToJSX} from "./Action";
import "../styles/appActionList.scss"

const actions = [
    {
        icon: "plus",
        action: ADD_NEW_NOTE_ACTION
    },
    {
        icon: "bars",
        action: OPEN_SIDEBAR_ACTION
    },
    {
        icon: "times",
        action: CLOSE_SIDEBAR_ACTION
    }
];

class AppActionList extends Component {
    render() {
        return (
            <section className="appActionList">
                {actionsToJSX(actions, this.props.handleAppAction)}
            </section>
        );
    }
    
}

export default AppActionList;
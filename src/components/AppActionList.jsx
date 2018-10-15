import React, {Component} from 'react';
import {ADD_NEW_NOTE_ACTION, CLOSE_SIDEBAR_ACTION, OPEN_SIDEBAR_ACTION} from "../js/noteSymbols";
import {actionsToJSX} from "./Action";
import "../styles/appActionList.scss"

const defaultActions = [
    {
        icon: "plus",
        action: ADD_NEW_NOTE_ACTION,
        title: "Create a new note"
    }
];

const smallScreenActions = [
    {
        icon: "bars",
        action: OPEN_SIDEBAR_ACTION,
        title: "Open Note List"
    },
    {
        icon: "times",
        action: CLOSE_SIDEBAR_ACTION,
        title: "Close Note List"
    }
];

const NO_WINDOW = Symbol("noWindow");
const SMALL_WINDOW = Symbol("smallWindow");
const MEDIUM_WINDOW = Symbol("mediumWindow");
const BIG_WINDOW = Symbol("bigWindow");

const SMALL_WINDOW_SIZE = 820;
const MEDIUM_WINDOW_SIZE = 1300;
const BIG_WINDOW_SIZE = 1800;

class AppActionList extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            actions: [],
            windowState: NO_WINDOW
        }
    }
    
    componentDidMount() {
        window.addEventListener("resize", this.handleOnResize)
        this.handleOnResize();
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleOnResize);
    }
    
    handleOnResize = () => {
        const windowWidth = window.innerWidth;
        let newWindowState;
        if(windowWidth >= BIG_WINDOW_SIZE) {
            newWindowState = BIG_WINDOW;
        } else if(windowWidth >= SMALL_WINDOW_SIZE) {
            newWindowState = MEDIUM_WINDOW;
        } else {
            newWindowState = SMALL_WINDOW;
        }
        
        if(newWindowState !== this.state.window) {
            if(newWindowState === SMALL_WINDOW) {
                this.setState({
                    actions: [...smallScreenActions, ...defaultActions]
                })
            } else {
                this.setState({
                    actions: [...defaultActions]
                })
            }
        }
        
        this.setState({
            windowState: newWindowState
        })
    };
    
    render() {
        return (
            <section className="appActionList">
                {actionsToJSX(this.state.actions, this.props.handleAppAction)}
            </section>
        );
    }
    
}

export default AppActionList;
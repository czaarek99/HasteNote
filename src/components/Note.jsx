import React, {Component} from 'react';
import "../styles/note.scss"
import onClickOutside from "react-onclickoutside"

class Note extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            mouseEntered: false
        }
    }
    
    render() {
        const {name, renaming, id} = this.props.note;
        
        let noteContainerContents = <p className="noteName">{name}</p>;
        if (renaming) {
            noteContainerContents = <React.Fragment>
                <input className="noteNameInput"
                       value={name}
                       onChange={this.handleNameChange}
                       onKeyDown={this.handleReactKeyDown}
                       autoFocus/>
            </React.Fragment>
        }
        
        let noteContainerClasses = "noteContainer ";
        if (this.props.activeNote.id === id) {
            noteContainerClasses += "active";
        }
        
        return (
            <section className={noteContainerClasses}
                     onClick={this.handleOnClick}
                     onMouseLeave={this.handleMouseLeave}
                     onMouseEnter={this.handleMouseEnter}>
                {noteContainerContents}
            </section>
        );
    }
    
    componentDidMount() {
        document.addEventListener("keydown", this.handleDocumentKeyDown);
    }
    
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleDocumentKeyDown)
    }
    
    handleClickOutside = () => {
        this.finishNameChange();
    };
    
    handleDocumentKeyDown = (event) => {
        if (event.key === "Escape") {
            this.finishNameChange();
        }
    };
    
    handleReactKeyDown = (event) => {
        if (event.key === "Enter") {
            this.finishNameChange();
        }
    };
    
    handleOnClick = () => {
        if (!this.props.note.renaming) {
            this.props.handleOnClick()
        }
    };
    
    handleMouseEnter = () => {
        if (this.props.note.renaming) {
            this.setState({
                mouseEntered: true
            })
        }
    };
    
    handleMouseLeave = () => {
        if (this.state.mouseEntered) {
            this.finishNameChange();
        }
    };
    
    finishNameChange() {
        if (this.props.note.renaming) {
            this.props.handleFinishNameChange();
            this.setState({
                mouseEntered: false
            })
        }
    }
    
    handleNameChange = (event) => {
        this.props.handleNameChange(event);
    }
}

export default onClickOutside(Note);
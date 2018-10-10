import React, { Component } from 'react';
import Navbar from "./Navbar";
import NoteList from "./NoteList"
import Editor from "./Editor";
import '../styles/app.css';

class App extends Component {
  render() {
    return (
        <React.Fragment>
            <Navbar/>
            <div className="appContainer">
                <NoteList/>
                <Editor/>
            </div>
        </React.Fragment>
    );
  }
}

export default App;

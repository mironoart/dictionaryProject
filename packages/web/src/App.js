import React, { Component } from "react";
import { add } from "@peanut/common";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{add(2, 4)}</p>
      </div>
    );
  }
}

export default App;

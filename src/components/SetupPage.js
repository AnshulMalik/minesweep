import React, { Component } from "react";
import ReactDom from "react-dom";

class SetupPage extends Component {
  constructor() {
    super();
    this.onWidthChange = this.onWidthChange.bind(this);
    this.onHeightChange = this.onHeightChange.bind(this);
    this.onBombsCountChange = this.onBombsCountChange.bind(this);
  }
  onWidthChange(e) {
    this.width = parseInt(e.target.value);
    this.props.onGridSizeChange(this.width, this.height);
  }
  onHeightChange(e) {
    this.height = parseInt(e.target.value);
    this.props.onGridSizeChange(this.width, this.height);
  }
  onBombsCountChange(e) {
    this.props.onBombsCountChange(e.target.value);
  }
  render() {
    return (
      <div className="setup-container">
          <input type="number" placeholder="Width" onChange={this.onWidthChange}></input>
          <input type="number" placeholder="Height" onChange={this.onHeightChange}></input>
          <input type="number" placeholder="Number of bombs" onChange={this.onBombsCountChange}></input>
          <div className="reset" onClick={this.props.onReset}></div>
      </div>
    );
  }
}

export default SetupPage;
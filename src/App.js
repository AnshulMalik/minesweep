import React, { Component } from "react";
import ReactDom from "react-dom";

import Container from "./components/Container";
import SetupPage from "./components/SetupPage";

import { generateBombLocations } from './utils';
import style from "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      grid: null,
      bombs: null,
      bombsCount: null,
    }

    this.onGridSizeChange = this.onGridSizeChange.bind(this);
    this.onBombsCountChange = this.onBombsCountChange.bind(this);
    this.onReset = this.onReset.bind(this);
  }
  onGridSizeChange(width, height) {
    if (width && height) {
      const newGrid = { width, height };
      this.setState({ grid: newGrid, bombs: generateBombLocations(newGrid, this.state.bombsCount) });
    }
  }
  onBombsCountChange(count) {
    this.setState({ bombsCount: count, bombs: generateBombLocations(this.state.grid, count) });
  }
  onReset() {
    const { grid, bombsCount } = this.state;
    this.setState({ grid: null });
    this.setState({ grid, bombs: generateBombLocations(grid, bombsCount) });
  }
  render() {
    const { grid, bombs } = this.state;

    const result = [
      <SetupPage
        onGridSizeChange={this.onGridSizeChange}
        onBombsCountChange={this.onBombsCountChange}
        onReset={this.onReset} />
    ]
    if(grid && bombs) {
      result.push(<Container grid={grid} bombs={bombs} onAction={this.onAction}/>);
    }
    return result;
  }
}

export default App;
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
      bombsCount: null
      // bombsCount: 10,
      // grid: { width: 10, height: 10 },
      // bombs: generateBombLocations({ width: 10, height: 10 }, 10)
    }

    this.onGridSizeChange = this.onGridSizeChange.bind(this);
    this.onBombsCountChange = this.onBombsCountChange.bind(this);
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
  render() {
    const { grid, bombs } = this.state;

    const result = [
      <SetupPage onGridSizeChange={this.onGridSizeChange} onBombsCountChange={this.onBombsCountChange} />
    ]
    if(grid && bombs) {
      // Grid size and number of bombs are not yet defined
      result.push(<Container grid={grid} bombs={bombs}/>);
    }
    return result;
  }
}

export default App;
import React, { Component } from "react";
import ReactDom from "react-dom";

import { generate2DArray, getAdjacentCells } from "../utils";

class Container extends Component {
  constructor() {
    super();
    this.state = { open: {}, gameOver: false };
    this.renderRow = this.renderRow.bind(this);
    this.onGridClick = this.onGridClick.bind(this);
    this.onGridRightClick = this.onGridRightClick.bind(this);
    this.getClassNameForCol = this.getClassNameForCol.bind(this);
    this.initOpenState = this.initOpenState.bind(this);
  }

  componentWillMount() {
    this.initOpenState(this.props);
  }

  componentWillReceiveProps(props) {
    this.initOpenState(props);
  }

  initOpenState({ grid, bombs }) {
    const { width, height } = grid;
    const bombSites = generate2DArray(width, height, false);
    const gridNumbers = generate2DArray(width + 1, height + 1, 0);
    const warnedSites = generate2DArray(width, height, false);
    const open = generate2DArray(width, height, false);

    for(let i = 0; i < bombs.length; i++) {
      const { x, y } = bombs[i];
      bombSites[x][y] = true;
      getAdjacentCells(x, y, width, height).forEach(c => {
        gridNumbers[c.x][c.y] += 1;
      });
    }

    this.setState({ open, bombSites, gridNumbers, warnedSites });
  }

  onGridClick(x, y) {
    const { open, bombSites, warnedSites, gameOver, gridNumbers } = this.state;
    const { bombs, grid: { width, height } } = this.props;
    if (warnedSites[x][y ] || gameOver) {
      // do not allow clicking on flagged squares
      return;
    }
    open[x][y] = true;
    if (bombSites[x][y]) {
      alert('Game Over');
      return this.setState({ gameOver: true, open });
    }
    if (gridNumbers[x][y] == 0) {
      const queue = [];
      const visited = generate2DArray(width, height, false);
      queue.push({x, y});
      while(queue.length) {
        const cell = queue.shift();
        const adj = getAdjacentCells(cell.x, cell.y, width, height);
        visited[cell.x][cell.y] = true;
        adj.forEach(c => {
          if(gridNumbers[c.x][c.y] == 0 && !visited[c.x][c.y]) {
            queue.push(c);
          }
          if (!bombSites[c.x][c.y]) {
            open[c.x][c.y] = true;
          }
          visited[c.x][c.y] = true;
        });
      }
    }
    this.setState({ open });
  }
  onGridRightClick(e, x, y) {
    e.preventDefault();

    if (this.state.gameOver) return;

    const { warnedSites } = this.state;
    warnedSites[x][y] = !warnedSites[x][y];
    this.setState({ warnedSites });

  }
  getClassNameForCol(x, y) {
    const { open, bombSites, warnedSites, gameOver } = this.state;
    if (gameOver && bombSites[x][y])
      return "bomb";

      if (warnedSites[x][y] && !open[x][y]) {
      return "warn";
    }
    return open[x][y] ? bombSites[x][y] ? "bomb" : "" : "hidden";
    // return bombSites[x][y] ? "bomb" : "";
  }
  renderRow(y) {
    const { open, bombSites, gridNumbers } = this.state;
    const { grid: { width } } = this.props;
    const cols = [];
    for(let x = 0; x < width; x++) {
      const className = this.getClassNameForCol(x, y);
      const text = open[x][y] && !bombSites[x][y] ? gridNumbers[x][y] : "";
      // const text = !bombSites[x][y] ? gridNumbers[x][y] : "";
      cols.push(<td className={className}
        key={`${x}-${y}`}
        onClick={() => this.onGridClick(x, y)}
        onContextMenu={(e) => this.onGridRightClick(e, x, y)}>
          {text}
        </td>)
    }
    return cols;
  }
  render() {
    const { width, height } = this.props.grid;
    let rows = [...Array(height)]
    rows = rows.map((_, i) => <tr key={i}>{this.renderRow(i)}</tr>);
    return (
      <div className="container">
        <table className="grid">
          {rows}
        </table>
      </div>
    );
  }
}

export default Container;
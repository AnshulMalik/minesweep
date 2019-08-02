export function generateBombLocations(grid, bombCount) {
  if (!bombCount || !grid) {
      return;
  }

  if (!grid.width || !grid.height) {
      return;
  }
  const locations = [];
  const { width, height } = grid;
  while(bombCount > 0) {
    let point = getRandomPoint(width, height);
    while(isPointInArray(point, locations))
      point = getRandomPoint(width, height)
    locations.push(point);
    bombCount--;
  }

  return locations;
}

function isPointInArray(point, array) {
    for(let i = 0; i < array.length; i++) {
        if (array[i].x == point.x && array[i].y == point.y)
            return true;
    }

    return false;
}

function getRandomPoint(width, height) {
    return { x: getRandomInt(width), y: getRandomInt(height) };
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function generate2DArray(x, y, def) {
    const result = {};
    for(let i = 0; i < x; i++) {
      result[i] = {};
      for(let j = 0; j < y; j++) {
        result[i][j] = def;
      }
    }
  
    return result;
  }

export function getAdjacentCells(x, y, width, height) {
    const adj = [];
    adj.push({x: x - 1, y: y - 1});
    adj.push({x, y: y - 1});
    adj.push({x: x + 1, y: y - 1});
    adj.push({x: x - 1, y: y});
    adj.push({x: x - 1, y: y + 1});
    adj.push({x, y: y + 1});
    adj.push({x: x + 1, y});
    adj.push({x: x + 1, y: y + 1});
    return adj.filter(i => i.x >= 0 && i.y >= 0 && i.x < width && i.y < height);
}

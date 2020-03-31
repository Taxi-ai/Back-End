const _Set = require("./_Set");
const ROW = 9;
const COL = 8;

const grid = [
  ["Goal", 0, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
  [0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
  ["Start", 1, 1, 0, 0, 0, 1, 0, 0, 1]
];

const source = [8, 0];
const destination = [0, 0];

// A Utility Function to check whether given cell (row, col)
// is a valid cell or not.
function isValidCell(cell) {
  return cell[0] >= 0 && cell[0] < ROW && cell[1] >= 0 && cell[1] < COL;
}

// A Utility Function to check whether the given cell is
// blocked or not
function isUnblockedCell(cell) {
  return grid[cell[0]][cell[1]] ? true : false;
}

// A Utility Function to check whether destination cell has
// been reached or not
function isDestination(cell) {
  if (cell[0] == destination[0] && cell[1] == destination[1]) return true;
  return false;
}

function calculateHeuristicValue(cell, dest) {
  return Math.sqrt(
    (cell[0] - dest[0]) * (cell[0] - dest[0]) +
      (cell[1] - dest[1]) * (cell[1] - dest[1])
  );
}

function tracePath(cellDetails, dest) {
  console.log("The Path is ...");
  let row = dest[0];
  let col = dest[1];
  let path = [];
  let direction = "Goal";
  while (
    !(
      cellDetails[row][col].parent_i == row &&
      cellDetails[row][col].parent_j == col
    )
  ) {
    path.push({
      node_i: row,
      node_j: col,
      dir: direction
    });
    let tempRow = cellDetails[row][col].parent_i;
    let tempCol = cellDetails[row][col].parent_j;
    if (row - 1 == tempRow && col == tempCol) direction = "South";
    else if (row + 1 == tempRow && col == tempCol) direction = "North";
    else if (row == tempRow && col + 1 == tempCol) direction = "West";
    else if (row == tempRow && col - 1 == tempCol) direction = "East";
    else if (row - 1 == tempRow && col + 1 == tempCol) direction = "South-West";
    else if (row - 1 == tempRow && col - 1 == tempCol) direction = "South-East";
    else if (row + 1 == tempRow && col + 1 == tempCol) direction = "North-West";
    else if (row + 1 == tempRow && col - 1 == tempCol) direction = "North-East";
    row = tempRow;
    col = tempCol;
  }
  path.push({
    node_i: row,
    node_j: col,
    dir: direction
  });

  while (path.length != 0) {
    let node = path.pop();
    console.log(`-->(${node.node_i},${node.node_j})-->${node.dir}`);
  }

  return;
}

// A Function to find the shortest path between
// a given source cell to a destination cell according
// to A* Search Algorithm
function aStarSearch(src, dest) {
  // If the source is out of range
  if (isValidCell(src) == false) {
    console.log("Source is invalid");
    return;
  }
  // If the destination is out of range
  if (isValidCell(dest) == false) {
    console.log("Destination is invalid\n");
    return;
  }
  // Either the source or the destination is blocked
  if (isUnblockedCell(src) == false || isUnblockedCell(dest) == false) {
    console.log("Source or the destination is blocked\n");
    return;
  }

  // If the destination cell is the same as source cell
  if (isDestination(src) == true) {
    console.log("We are already at the destination\n");
    return;
  }
  // Create a closed list and initialize it to false which means
  // that no cell has been included yet
  // This closed list is implemented as a boolean 2D array
  let closedList = new Array(ROW)
    .fill(false)
    .map(() => new Array(COL).fill(false));
  // Declare a 2D array of cell to hold the details
  let cellDetails = new Array(ROW).fill(0).map(() => new Array(COL).fill(0));
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      cellDetails[i][j] = {
        fValue: 100,
        goalValue: 100,
        heuristicValue: 100,
        parent_i: -1,
        parent_j: -1,
        direction: ""
      };
    }
  }
  // Initializing the parameters of the starting node
  i = src[0]; // Source Node i
  j = src[1]; // Source Node j
  cellDetails[i][j].fValue = 0.0;
  cellDetails[i][j].goalValue = 0.0;
  cellDetails[i][j].heuristicValue = 0.0;
  cellDetails[i][j].parent_i = i;
  cellDetails[i][j].parent_j = j;
  cellDetails[i][j].direction = "ss";

  /*
	Create an open list having information as- <f, <i, j>>
	where f = g + h, and i, j are the row and column index of that cell
	Note that 0 <= i <= ROW-1 & 0 <= j <= COL-1
    This open list is implemented as a set of pair of pair.*/
  let openList = new _Set();

  openList.insert({
    fValue: 0.0,
    node_i: i,
    node_j: j
  });
  // We set this boolean value as false as initially
  // the destination is not reached.
  let foundDest = false;
  while (openList.size != 0) {
    let node = openList.begin();
    // Remove this vertex from the open list
    openList.delete(node);
    // insert this vertex to the closed list
    i = node.node_i;
    j = node.node_j;

    closedList[i][j] = true;
    /*
		Generating all the 8 successor of this cell

			N.W     N   N.E
			   \   |   /
			    \  |  /
			W----Cell----E
				/ |  \
			   /  |   \
			S.W   S   S.E
		Cell-->Popped Cell (i, j)
		N --> North	 (i-1, j)
		S --> South	 (i+1, j)
		E --> East	 (i, j+1)
		W --> West		 (i, j-1)
		N.E--> North-East (i-1, j+1)
		N.W--> North-West (i-1, j-1)
		S.E--> South-East (i+1, j+1)
		S.W--> South-West (i+1, j-1)*/

    // To store the 'g', 'h' and 'f' of the 8 successors
    let goalNewValue;
    let heuristicNewValue;
    let fNewValue;
    //----------- 1st Successor (North) ------------
    // Only process this cell if this is a valid one
    let successor = [i - 1, j];
    if (isValidCell(successor) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(successor) == true) {
        // Set the Parent of the destination cell
        cellDetails[successor[0]][successor[1]].parent_i = i;
        cellDetails[successor[0]][successor[1]].parent_j = j;
        cellDetails[successor[0]][successor[1]].direction = "North";
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
        foundDest = true;
        return;
      } else if (
        closedList[successor[0]][successor[1]] == false &&
        isUnblockedCell(successor) == true
      ) {
        goalNewValue = cellDetails[i][j].goalValue + 1.0;
        heuristicNewValue = calculateHeuristicValue(successor, dest);
        fNewValue = goalNewValue + heuristicNewValue;
        // If it isn’t on the open list, insert it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //			 OR
        // If it is on the open list already, check
        // to see if this path to that square is better,
        // using 'f' cost as the measure.
        if (
          cellDetails[successor[0]][successor[1]].fValue == 100 ||
          cellDetails[successor[0]][successor[1]].fValue > fNewValue
        ) {
          openList.insert({
            fValue: fNewValue,
            node_i: successor[0],
            node_j: successor[1]
          });
          //console.log(successor[0], "--", successor[1], "--", fNewValue);
          // Update the details of this cell
          cellDetails[successor[0]][successor[1]].fValue = fNewValue;
          cellDetails[successor[0]][successor[1]].goalValue = goalNewValue;
          cellDetails[successor[0]][
            successor[1]
          ].heuristicValue = heuristicNewValue;
          cellDetails[successor[0]][successor[1]].parent_i = i;
          cellDetails[successor[0]][successor[1]].parent_j = j;
          cellDetails[successor[0]][successor[1]].direction = "North";
        }
      }
    }

    //----------- 2nd Successor (South) ------------
    // Only process this cell if this is a valid one
    successor = [i + 1, j];
    if (isValidCell(successor) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(successor) == true) {
        // Set the Parent of the destination cell
        cellDetails[successor[0]][successor[1]].parent_i = i;
        cellDetails[successor[0]][successor[1]].parent_j = j;
        cellDetails[successor[0]][successor[1]].direction = "South";
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
        foundDest = true;
        return;
      } else if (
        closedList[successor[0]][successor[1]] == false &&
        isUnblockedCell(successor) == true
      ) {
        goalNewValue = cellDetails[i][j].goalValue + 1.0;
        heuristicNewValue = calculateHeuristicValue(successor, dest);
        fNewValue = goalNewValue + heuristicNewValue;
        // If it isn’t on the open list, insert it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //			 OR
        // If it is on the open list already, check
        // to see if this path to that square is better,
        // using 'f' cost as the measure.
        if (
          cellDetails[successor[0]][successor[1]].fValue == 100 ||
          cellDetails[successor[0]][successor[1]].fValue > fNewValue
        ) {
          openList.insert({
            fValue: fNewValue,
            node_i: successor[0],
            node_j: successor[1]
          });
          //console.log(successor[0], "--", successor[1], "--", fNewValue);
          // Update the details of this cell
          cellDetails[successor[0]][successor[1]].fValue = fNewValue;
          cellDetails[successor[0]][successor[1]].goalValue = goalNewValue;
          cellDetails[successor[0]][
            successor[1]
          ].heuristicValue = heuristicNewValue;
          cellDetails[successor[0]][successor[1]].parent_i = i;
          cellDetails[successor[0]][successor[1]].parent_j = j;
          cellDetails[successor[0]][successor[1]].direction = "South";
        }
      }
    }

    //----------- 3rd Successor (East) ------------
    // Only process this cell if this is a valid one
    successor = [i, j + 1];
    if (isValidCell(successor) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(successor) == true) {
        // Set the Parent of the destination cell
        cellDetails[successor[0]][successor[1]].parent_i = i;
        cellDetails[successor[0]][successor[1]].parent_j = j;
        cellDetails[successor[0]][successor[1]].direction = "East";
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
        foundDest = true;
        return;
      } else if (
        closedList[successor[0]][successor[1]] == false &&
        isUnblockedCell(successor) == true
      ) {
        goalNewValue = cellDetails[i][j].goalValue + 1.0;
        heuristicNewValue = calculateHeuristicValue(successor, dest);
        fNewValue = goalNewValue + heuristicNewValue;
        // If it isn’t on the open list, insert it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //			 OR
        // If it is on the open list already, check
        // to see if this path to that square is better,
        // using 'f' cost as the measure.

        if (
          cellDetails[successor[0]][successor[1]].fValue == 100 ||
          cellDetails[successor[0]][successor[1]].fValue > fNewValue
        ) {
          openList.insert({
            fValue: fNewValue,
            node_i: successor[0],
            node_j: successor[1]
          });
          //console.log(successor[0], "--", successor[1], "--", fNewValue);

          // Update the details of this cell
          cellDetails[successor[0]][successor[1]].fValue = fNewValue;
          cellDetails[successor[0]][successor[1]].goalValue = goalNewValue;
          cellDetails[successor[0]][
            successor[1]
          ].heuristicValue = heuristicNewValue;
          cellDetails[successor[0]][successor[1]].parent_i = i;
          cellDetails[successor[0]][successor[1]].parent_j = j;
          cellDetails[successor[0]][successor[1]].direction = "East";
        }
      }
    }

    //----------- 4th Successor (West) ------------
    // Only process this cell if this is a valid one
    successor = [i, j - 1];
    if (isValidCell(successor) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(successor) == true) {
        // Set the Parent of the destination cell
        cellDetails[successor[0]][successor[1]].parent_i = i;
        cellDetails[successor[0]][successor[1]].parent_j = j;
        cellDetails[successor[0]][successor[1]].direction = "West";
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
        foundDest = true;
        return;
      } else if (
        closedList[successor[0]][successor[1]] == false &&
        isUnblockedCell(successor) == true
      ) {
        goalNewValue = cellDetails[i][j].goalValue + 1.0;
        heuristicNewValue = calculateHeuristicValue(successor, dest);
        fNewValue = goalNewValue + heuristicNewValue;
        // If it isn’t on the open list, insert it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //			 OR
        // If it is on the open list already, check
        // to see if this path to that square is better,
        // using 'f' cost as the measure.
        if (
          cellDetails[successor[0]][successor[1]].fValue == 100 ||
          cellDetails[successor[0]][successor[1]].fValue > fNewValue
        ) {
          openList.insert({
            fValue: fNewValue,
            node_i: successor[0],
            node_j: successor[1]
          });
          // console.log(successor[0], "--", successor[1], "--", fNewValue);

          // Update the details of this cell
          cellDetails[successor[0]][successor[1]].fValue = fNewValue;
          cellDetails[successor[0]][successor[1]].goalValue = goalNewValue;
          cellDetails[successor[0]][
            successor[1]
          ].heuristicValue = heuristicNewValue;
          cellDetails[successor[0]][successor[1]].parent_i = i;
          cellDetails[successor[0]][successor[1]].parent_j = j;
          cellDetails[successor[0]][successor[1]].direction = "West";
        }
      }
    }

    //----------- 5th Successor (North-East) ------------
    // Only process this cell if this is a valid one
    successor = [i - 1, j + 1];
    if (isValidCell(successor) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(successor) == true) {
        // Set the Parent of the destination cell
        cellDetails[successor[0]][successor[1]].parent_i = i;
        cellDetails[successor[0]][successor[1]].parent_j = j;
        cellDetails[successor[0]][successor[1]].direction = "North-East";
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
        foundDest = true;
        return;
      } else if (
        closedList[successor[0]][successor[1]] == false &&
        isUnblockedCell(successor) == true
      ) {
        goalNewValue = cellDetails[i][j].goalValue + 1.414;
        heuristicNewValue = calculateHeuristicValue(successor, dest);
        fNewValue = goalNewValue + heuristicNewValue;
        // If it isn’t on the open list, insert it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //			 OR
        // If it is on the open list already, check
        // to see if this path to that square is better,
        // using 'f' cost as the measure.
        if (
          cellDetails[successor[0]][successor[1]].fValue == 100 ||
          cellDetails[successor[0]][successor[1]].fValue > fNewValue
        ) {
          openList.insert({
            fValue: fNewValue,
            node_i: successor[0],
            node_j: successor[1]
          });
          //console.log(successor[0], "--", successor[1], "--", fNewValue);

          // Update the details of this cell
          cellDetails[successor[0]][successor[1]].fValue = fNewValue;
          cellDetails[successor[0]][successor[1]].goalValue = goalNewValue;
          cellDetails[successor[0]][
            successor[1]
          ].heuristicValue = heuristicNewValue;
          cellDetails[successor[0]][successor[1]].parent_i = i;
          cellDetails[successor[0]][successor[1]].parent_j = j;
          cellDetails[successor[0]][successor[1]].direction = "North-East";
        }
      }
    }

    //----------- 6th Successor (North-West) ------------
    // Only process this cell if this is a valid one
    successor = [i - 1, j - 1];
    if (isValidCell(successor) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(successor) == true) {
        // Set the Parent of the destination cell
        cellDetails[successor[0]][successor[1]].parent_i = i;
        cellDetails[successor[0]][successor[1]].parent_j = j;
        cellDetails[successor[0]][successor[1]].direction = "North-West";
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
        foundDest = true;
        return;
      } else if (
        closedList[successor[0]][successor[1]] == false &&
        isUnblockedCell(successor) == true
      ) {
        goalNewValue = cellDetails[i][j].goalValue + 1.414;
        heuristicNewValue = calculateHeuristicValue(successor, dest);
        fNewValue = goalNewValue + heuristicNewValue;
        // If it isn’t on the open list, insert it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //			 OR
        // If it is on the open list already, check
        // to see if this path to that square is better,
        // using 'f' cost as the measure.
        if (
          cellDetails[successor[0]][successor[1]].fValue == 100 ||
          cellDetails[successor[0]][successor[1]].fValue > fNewValue
        ) {
          openList.insert({
            fValue: fNewValue,
            node_i: successor[0],
            node_j: successor[1]
          });
          //console.log(successor[0], "--", successor[1], "--", fNewValue);

          // Update the details of this cell
          cellDetails[successor[0]][successor[1]].fValue = fNewValue;
          cellDetails[successor[0]][successor[1]].goalValue = goalNewValue;
          cellDetails[successor[0]][
            successor[1]
          ].heuristicValue = heuristicNewValue;
          cellDetails[successor[0]][successor[1]].parent_i = i;
          cellDetails[successor[0]][successor[1]].parent_j = j;
          cellDetails[successor[0]][successor[1]].direction = "North-West";
        }
      }
    }

    //----------- 7th Successor (South-East) ------------
    // Only process this cell if this is a valid one
    successor = [i + 1, j + 1];
    if (isValidCell(successor) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(successor) == true) {
        // Set the Parent of the destination cell
        cellDetails[successor[0]][successor[1]].parent_i = i;
        cellDetails[successor[0]][successor[1]].parent_j = j;
        cellDetails[successor[0]][successor[1]].direction = "South-East";
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
        foundDest = true;
        return;
      } else if (
        closedList[successor[0]][successor[1]] == false &&
        isUnblockedCell(successor) == true
      ) {
        goalNewValue = cellDetails[i][j].goalValue + 1.414;
        heuristicNewValue = calculateHeuristicValue(successor, dest);
        fNewValue = goalNewValue + heuristicNewValue;
        // If it isn’t on the open list, insert it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //			 OR
        // If it is on the open list already, check
        // to see if this path to that square is better,
        // using 'f' cost as the measure.
        if (
          cellDetails[successor[0]][successor[1]].fValue == 100 ||
          cellDetails[successor[0]][successor[1]].fValue > fNewValue
        ) {
          openList.insert({
            fValue: fNewValue,
            node_i: successor[0],
            node_j: successor[1]
          });
          //console.log(successor[0], "--", successor[1], "--", fNewValue);

          // Update the details of this cell
          cellDetails[successor[0]][successor[1]].fValue = fNewValue;
          cellDetails[successor[0]][successor[1]].goalValue = goalNewValue;
          cellDetails[successor[0]][
            successor[1]
          ].heuristicValue = heuristicNewValue;
          cellDetails[successor[0]][successor[1]].parent_i = i;
          cellDetails[successor[0]][successor[1]].parent_j = j;
          cellDetails[successor[0]][successor[1]].direction = "South-East";
        }
      }
    }

    //----------- 8th Successor (South-West) ------------
    // Only process this cell if this is a valid one
    successor = [i + 1, j - 1];
    if (isValidCell(successor) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(successor) == true) {
        // Set the Parent of the destination cell
        cellDetails[successor[0]][successor[1]].parent_i = i;
        cellDetails[successor[0]][successor[1]].parent_j = j;
        cellDetails[successor[0]][successor[1]].direction = "South-West";
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
        foundDest = true;
        return;
      } else if (
        closedList[successor[0]][successor[1]] == false &&
        isUnblockedCell(successor) == true
      ) {
        goalNewValue = cellDetails[i][j].goalValue + 1.414;
        heuristicNewValue = calculateHeuristicValue(successor, dest);
        fNewValue = goalNewValue + heuristicNewValue;
        // If it isn’t on the open list, insert it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //			 OR
        // If it is on the open list already, check
        // to see if this path to that square is better,
        // using 'f' cost as the measure.
        if (
          cellDetails[successor[0]][successor[1]].fValue == 100 ||
          cellDetails[successor[0]][successor[1]].fValue > fNewValue
        ) {
          openList.insert({
            fValue: fNewValue,
            node_i: successor[0],
            node_j: successor[1]
          });
          //console.log(successor[0], "--", successor[1], "--", fNewValue);

          // Update the details of this cell
          cellDetails[successor[0]][successor[1]].fValue = fNewValue;
          cellDetails[successor[0]][successor[1]].goalValue = goalNewValue;
          cellDetails[successor[0]][
            successor[1]
          ].heuristicValue = heuristicNewValue;
          cellDetails[successor[0]][successor[1]].parent_i = i;
          cellDetails[successor[0]][successor[1]].parent_j = j;
          cellDetails[successor[0]][successor[1]].direction = "South-West";
        }
      }
    }
  }
}

aStarSearch(source, destination);

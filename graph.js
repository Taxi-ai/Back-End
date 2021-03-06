const _Set = require("./_Set");
const _Graph = require("./_Graph");
const _Node = require("./_Node");
const readline = require("readline-sync");
// Tracing The Shortest Path
var tracePath = [];
function TracePath(g, startNode, goalNode) {
  let graph = g;
  let dir = "";
  let currentNode = graph[goalNode.label];

  let path = [];
  while (currentNode.parentNode != "") {
    graph[currentNode.parentNode].adjacencyNodes.forEach((element) => {
      if (element.node.label == currentNode.vertex.label)
        dir = element.direction;
    });
    path.push({ node: currentNode.vertex, direction: dir });
    currentNode = graph[currentNode.parentNode];
  }
  // graph[currentNode.vertex.label].adjacencyNodes.forEach((element) => {
  //   if (element.node.label == currentNode.vertex.label) dir = element.direction;
  // });
  path.push({ node: startNode });
  while (path.length != 0) {
    let node = path.pop();
    console.log(
      `-->(${node.direction}, XCord:${node.node.x}, YCord:${node.node.y})`
    );
    tracePath.push({
      direction: node.direction,
      xCord: node.node.x,
      yCord: node.node.y,
    });
  }
}

// Start Here
function ShortestPathFinding(graph, startNode, goalNode) {
  let openList = new _Set();
  let closedList = {};
  let currentNode = graph[startNode.label];
  //console.log(currentNode);
  openList.insert(currentNode);
  const keys = Object.keys(graph);
  for (let key of keys) {
    closedList[key] = false;
  }
  console.log("----SHORTEST PATH FINDING----");
  while (currentNode.vertex.label != goalNode.label) {
    for (let i = 0; i < currentNode.adjacencyNodes.length; i++) {
      if (
        !closedList[currentNode.adjacencyNodes[i].node.label] &&
        !openList.find(graph[currentNode.adjacencyNodes[i].node.label])
      ) {
        let fNewValue =
          currentNode.adjacencyNodes[i].distance +
          graph[currentNode.adjacencyNodes[i].node.label].heuristic;
        if (
          graph[currentNode.adjacencyNodes[i].node.label].fValue > fNewValue ||
          graph[currentNode.adjacencyNodes[i].node.label].fValue == 1000
        ) {
          graph[currentNode.adjacencyNodes[i].node.label].fValue = fNewValue;
          graph[currentNode.adjacencyNodes[i].node.label].parentNode =
            currentNode.vertex.label;
        }
        openList.insert(graph[currentNode.adjacencyNodes[i].node.label]);
      }
    }
    closedList[currentNode.vertex.label] = true;
    openList.delete(currentNode);
    currentNode = openList.begin();
  }
  TracePath(graph, startNode, goalNode);
  console.log("---END----");
}

let g = new _Graph();
const arr = [];
const n1 = new _Node("n1", 12, 210);
const n2 = new _Node("n2", 80, 185);
const n3 = new _Node("n3", 110, 130);
const n4 = new _Node("n4", 150, 80);
const n5 = new _Node("n5", 150, 50);
const n6 = new _Node("n6", 150, 8);
const n7 = new _Node("n7", 230, 80);
const n8 = new _Node("n8", 275, 245);
const n9 = new _Node("n9", 230, 210);
const n10 = new _Node("n10", 200, 185);
const n11 = new _Node("n11", 200, 130);
const n12 = new _Node("n12", 150, 130);
const n13 = new _Node("n13", 200, 50);
arr.push(n1);
arr.push(n2);
arr.push(n3);
arr.push(n4);
arr.push(n5);
arr.push(n6);
arr.push(n7);
arr.push(n8);
arr.push(n9);
arr.push(n10);
arr.push(n11);
arr.push(n12);
arr.push(n13);
for (var i = 0; i < 13; i++) g.AddVertex(arr[i]);
g.CalculateGraphHeuristics(n1);
//console.log(g.PrintGraph());
g.AddEdge(n7, n13, "RIGHT");
g.AddEdge(n7, n4, "LONG");
g.AddEdge(n5, n4, "LONG");
g.AddEdge(n6, n5, "LONG");
g.AddEdge(n4, n3, "RIGHT");
g.AddEdge(n3, n2, "LONG");
g.AddEdge(n2, n1, "LONG");
g.AddEdge(n8, n9, "LONG");
g.AddEdge(n9, n10, "LONG");
g.AddEdge(n10, n11, "LONG");
g.AddEdge(n10, n12, "LEFT");
g.AddEdge(n11, n3, "LEFT");
g.AddEdge(n12, n3, "LEFT");

module.exports = {
  getShortestPathBetween: function (start, end) {
    ShortestPathFinding(g.adjacencyList, start, end);
    return tracePath;
  },
};

// var end = "N";
// while (end != "Y") {
//   var S = new _Node();
//   var G = new _Node();
//   S.label = readline.question("What is Start Node Label?: ");
//   S.x = readline.question("What is xCord: ");
//   S.y = readline.question("What is yCord?: ");
//   G.label = readline.question("What is Goal Node Label?: ");
//   G.x = readline.question("What is xCord: ");
//   G.y = readline.question("What is yCord?: ");
//   ShortestPathFinding(g.adjacencyList, S, G);
//   end = readline.question("PRESS Y FOR END / PRESS N FOR CONTINUE...");
// }

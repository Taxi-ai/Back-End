const _Set = require("./_Set");
const _Graph = require("./_Graph");

// Handling Node Details
function TracePath(g, startNode, goalNode) {
  let graph = g;
  let currentNode = graph[goalNode];
  let path = [];

  while (currentNode.parentNode != "") {
    path.push(currentNode.vertex);
    currentNode = graph[currentNode.parentNode];
  }
  path.push(startNode);
  while (path.length != 0) {
    let node = path.pop();
    console.log(`-->(${node}`);
  }
}

function ShortestPathFinding(graph, startNode, goalNode) {
  let openList = new _Set();
  let closedList = {};
  let currentNode = graph[startNode];

  openList.insert(currentNode);
  const keys = Object.keys(graph);
  for (let key of keys) {
    closedList[key] = false;
  }
  //console.log(openList);
  //console.log(closedList);
  console.log("----SHORTEST PATH FINDING----");
  while (currentNode.vertex != goalNode) {
    //console.log(currentNode.vertex);
    for (let i = 0; i < currentNode.adjacencyNodes.length; i++) {
      //console.log(graph[currentNode.adjacencyNodes[i].node].vertex);
      //console.log(openList.find(graph[currentNode.adjacencyNodes[i].node]));
      //console.log(!closedList[currentNode.adjacencyNodes[i].node]);

      //console.log(openList.getElements());
      //console.log(graph[currentNode.adjacencyNodes[i].node].vertex);
      //console.log(openList.find(graph[currentNode.adjacencyNodes[i].node]));
      if (
        !closedList[currentNode.adjacencyNodes[i].node] &&
        !openList.find(graph[currentNode.adjacencyNodes[i].node])
      ) {
        //console.log("here1");
        let fNewValue =
          currentNode.adjacencyNodes[i].weight +
          graph[currentNode.adjacencyNodes[i].node].heuristic;

        if (
          graph[currentNode.adjacencyNodes[i].node].fValue > fNewValue ||
          graph[currentNode.adjacencyNodes[i].node].fValue == 100
        ) {
          graph[currentNode.adjacencyNodes[i].node].fValue = fNewValue;
          graph[currentNode.adjacencyNodes[i].node].parentNode =
            currentNode.vertex;
        }
        //console.log(openList.getElements());
        openList.insert(graph[currentNode.adjacencyNodes[i].node]);

        //graph[currentNode.adjacencyNodes[i].node].parentNode =
        //  currentNode.vertex;
      }
    }
    //console.log(currentNode.vertex);
    //console.log(currentNode.vertex);
    //console.log(closedList[currentNode.vertex]);
    closedList[currentNode.vertex] = true;
    //console.log(closedList[currentNode.vertex]);
    openList.delete(graph[currentNode.vertex]);
    currentNode = openList.begin();
  }

  //console.log(graph);
  TracePath(graph, startNode, goalNode);
  console.log(goalNode);
  console.log("---END----");
  //TracePath(graph[goalNode]);
}

//console.log(nodes);
let g = new _Graph();
g.AddVertex("A", 19, 1000);
g.AddVertex("B", 14, 1000);
g.AddVertex("C", 16, 1000);
g.AddVertex("D", 11, 1000);
g.AddVertex("E", 19, 1000);
g.AddVertex("F", 23, 1000);
g.AddVertex("G", 20, 1000);
g.AddVertex("H", 14, 1000);
g.AddVertex("I", 13, 1000);
g.AddVertex("J", 11, 1000);
g.AddVertex("K", 7, 1000);
g.AddVertex("L", 4, 1000);
g.AddVertex("M", 5, 1000);
g.AddVertex("N", 10, 1000);
g.AddVertex("O", 0, 1000);
g.AddVertex("P", 5, 1000);

g.AddEdge("A", "B", 5);
g.AddEdge("A", "C", 5);
g.AddEdge("B", "C", 4);
g.AddEdge("B", "D", 3);
g.AddEdge("C", "D", 7);
g.AddEdge("C", "E", 7);
g.AddEdge("C", "H", 8);
g.AddEdge("D", "H", 11);
g.AddEdge("D", "K", 16);
g.AddEdge("D", "L", 13);
g.AddEdge("D", "M", 14);
g.AddEdge("E", "H", 5);
g.AddEdge("E", "F", 4);
g.AddEdge("F", "G", 9);
g.AddEdge("G", "N", 12);
g.AddEdge("H", "I", 3);
g.AddEdge("I", "J", 4);
g.AddEdge("J", "N", 3);
g.AddEdge("J", "P", 8);
g.AddEdge("K", "P", 4);
g.AddEdge("K", "N", 7);
g.AddEdge("K", "L", 5);
g.AddEdge("L", "O", 4);
g.AddEdge("L", "M", 9);
g.AddEdge("M", "O", 5);
g.AddEdge("N", "P", 7);

//console.log(g.adjacencyList);
ShortestPathFinding(g.adjacencyList, "A", "O");

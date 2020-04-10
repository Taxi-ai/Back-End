module.exports = class _Graph {
  constructor() {
    this.adjacencyList = {};
  }
  AddVertex(vertex) {
    if (!this.adjacencyList[vertex.label])
      this.adjacencyList[vertex.label] = {
        vertex,
        heuristic: 0,
        adjacencyNodes: [],
        fValue: 1000,
        parentNode: ""
      };
  }
  EuclideanDistance(startVertex, targetVertex) {
    var xDifference = Math.abs(
      Math.floor(targetVertex.x) - Math.floor(startVertex.x)
    );
    var yDifference = Math.abs(
      Math.floor(targetVertex.y) - Math.floor(startVertex.y)
    );
    var xDiffSqrt = xDifference * xDifference;
    var yDiffSqrt = yDifference * yDifference;
    return Math.floor(Math.sqrt(xDiffSqrt + yDiffSqrt));
  }

  CalculateGraphHeuristics(targetVertex) {
    const keys = Object.keys(this.adjacencyList);
    for (let key of keys) {
      //console.log(key);
      this.adjacencyList[key].heuristic = this.EuclideanDistance(
        this.adjacencyList[key].vertex,
        targetVertex
      );
    }
  }

  AddEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1.label].adjacencyNodes.push({
      node: vertex2,
      distance: this.EuclideanDistance(vertex1, vertex2)
    });
  }
  PrintGraph() {
    console.log(this.adjacencyList);
    const keys = Object.keys(this.adjacencyList);
    for (let key of keys) {
      console.log(this.adjacencyList[key].adjacencyNodes);
    }
  }
};

/*
let g = new _Graph();
g.AddVertex("A", 14);
g.AddVertex("B", 12);
g.AddVertex("C", 11);
g.AddVertex("D", 6);
g.AddVertex("E", 4);
g.AddVertex("F", 11);
g.AddVertex("Z", 0);

g.AddEdge("A", "B", 4);
g.AddEdge("A", "C", 3);
g.AddEdge("B", "F", 5);
g.AddEdge("B", "E", 12);
g.AddEdge("C", "D", 7);
g.AddEdge("C", "E", 10);
g.AddEdge("D", "E", 2);
g.AddEdge("E", "Z", 5);
g.AddEdge("F", "Z", 16);

g.PrintGraph();
*/

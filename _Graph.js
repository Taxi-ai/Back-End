module.exports = class _Graph {
  constructor() {
    this.adjacencyList = {};
  }
  AddVertex(vertex, heuristic, fValue) {
    if (!this.adjacencyList[vertex])
      this.adjacencyList[vertex] = {
        vertex,
        heuristic,
        adjacencyNodes: [],
        fValue,
        parentNode: ""
      };
  }
  AddEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].adjacencyNodes.push({ node: vertex2, weight });
    this.adjacencyList[vertex2].adjacencyNodes.push({ node: vertex1, weight });
  }
  PrintGraph() {
    console.log(this.adjacencyList);
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

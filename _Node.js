module.exports = class _Node {
  constructor(label, xCord, yCord) {
    this.label = label;
    this.x = xCord;
    this.y = yCord;
  }
};
/*
const g = new _Graph();

const arr = [];
const n1 = new _Node("G", 12, 210);
const n2 = new _Node("n2", 80, 185);
const n3 = new _Node("n3", 110, 130);
const n4 = new _Node("n5", 150, 80);
const n5 = new _Node("n8", 150, 50);
const n6 = new _Node("n6", 150, 8);
const n7 = new _Node("S", 230, 80);
const n9 = new _Node("n7", 275, 245);
const n10 = new _Node("n7", 230, 210);
const n11 = new _Node("n7", 200, 185);
const n12 = new _Node("n7", 200, 130);
const n13 = new _Node("n7", 150, 130);

arr.push(n1);
arr.push(n2);
arr.push(n3);
arr.push(n4);
arr.push(n5);
arr.push(n6);
arr.push(n7);
arr.push(n8);
console.log(arr);
*/
/*
for (var i = 0; i < 8; i++) {
  g.AddVertex(arr[i]);
}
g.CalculateGraphHeuristics(n1);
console.log(g.PrintGraph());
g.AddEdge(n7, n5);
g.AddEdge(n5, n3);
g.AddEdge(n5, n8);
g.AddEdge(n8, n6);
g.AddEdge(n3, n2);
g.AddEdge(n2, n1);
console.log(g.PrintGraph());
*/
/*
const nodesList = new _ListOfNodes();
nodesList.insertInOrderByXCord(n1);
nodesList.insertInOrderByXCord(n2);
nodesList.insertInOrderByXCord(n3);
nodesList.insertInOrderByXCord(n4);
nodesList.insertInOrderByXCord(n5);
nodesList.insertInOrderByXCord(n6);
console.log(nodesList.getElements());

console.log(nodesList.isExist(n1));
console.log(nodesList.isExist(n2));
console.log(nodesList.isExist(n3));
console.log(nodesList.isExist(n4));
console.log(nodesList.isExist(n5));
console.log(nodesList.isExist(n6));
*/

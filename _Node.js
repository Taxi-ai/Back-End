const _ListOfNodes = require("./_ListOfNodes.js");
class _Node {
  constructor(label, xCord, yCord) {
    this.label = label;
    this.x = xCord;
    this.y = yCord;
  }
}

const n1 = new _Node("n1", 15, 180);
const n2 = new _Node("n2", 10, 120);
const n3 = new _Node("n3", 8, 130);
const n4 = new _Node("n4", 8, 130);
const n5 = new _Node("n5", 10, 120);
const n6 = new _Node("n6", 10, 120);

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

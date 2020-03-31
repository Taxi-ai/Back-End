module.exports = class ListOfNodes {
  constructor() {
    this._list = [];
  }

  isExist(node) {
    for (let i = 0; i < this._list.length; i++) {
      if (node.label === null) {
        if (node.x === this._list[i].x && node.y === this._list[i].y)
          return true;
      } else if (node.label !== null) {
        if (node.x === this._list[i].x && node.y === this._list[i].y)
          return true;
      }
    }
    return false;
  }
  // Returns all elements in the set
  getElements() {
    return this._list;
  }
  // Checks whether the set is empty or not
  isEmpty() {
    return this._list.length == 0 ? true : false;
  }
  insertInOrderByXCord(node) {
    if (this._list.length == 0) {
      this._list.push(node);
      return;
    }
    if (this.isExist(node) == true) {
      return;
    }

    // Inserting the node in its order
    for (let i = 0; i < this._list.length; i++) {
      if (node.x < this._list[i].x) {
        this._list.splice(i, 0, node);
        return;
      }
    }
    this._list.splice(this._list.length, 0, node);
  }
};

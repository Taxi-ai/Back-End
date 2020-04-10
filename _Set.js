module.exports = class _Set {
  constructor() {
    this._arr = [];
  }
  // Return the top of the set
  begin() {
    return this._arr[0];
  }
  get size() {
    return this._arr.length;
  }
  // Returns all elements in the set
  get getElements() {
    return this._arr;
  }
  // Checks whether the set is empty or not
  get isEmpty() {
    return this._arr.length == 0 ? true : false;
  }
  delete(node) {
    const index = this._arr.indexOf(node);
    this._arr.splice(index, 1);
  }
  // Finding the node if exist
  find(node) {
    for (let i = 0; i < this._arr.length; i++) {
      if (node.vertex.label == this._arr[i].vertex.label) return true;
    }
    return false;
  }
  // Insert elements in order
  insert(node) {
    if (this._arr.length == 0) this._arr.push(node);
    else {
      // Check if the node exists before
      if (this.find(node) == true) return;
      else {
        for (let i = 0; i < this._arr.length; i++) {
          if (node.fValue < this._arr[i].fValue) {
            this._arr.splice(i, 0, node);
            return;
          }
        }
        this._arr.splice(this._arr.length, 0, node);
      }
    }
  }
};

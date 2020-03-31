// Creating custom set data structure ...
// which has insert in order property

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
  getElements() {
    return this._arr;
  }
  // Checks whether the set is empty or not
  isEmpty() {
    return this._arr.length == 0 ? true : false;
  }
  delete(element) {
    //console.log(this._arr);
    const index = this._arr.indexOf(element);
    this._arr.splice(index, 1);
    //console.log(element);
    //console.log("deleted");
    //console.log(this._arr);
  }
  find(element) {
    for (let i = 0; i < this._arr.length; i++) {
      //console.log(element.vertex);
      //console.log(this._arr[i]);
      //console.log("here");
      //console.log(element);
      if (element.vertex == this._arr[i].vertex) {
        return true;
      }
    }
    return false;
  }
  // Insert elements in order
  insert(element) {
    if (this._arr.length == 0) this._arr.push(element);
    else {
      // Check if the node exists before
      for (let i = 0; i < this._arr.length; i++) {
        if (element.vertex === this._arr[i].vertex) {
          //console.log("inserted");
          return;
        }
      }
      //console.log("not here..");
      // Inserting the node in its order
      for (let i = 0; i < this._arr.length; i++) {
        if (element.fValue < this._arr[i].fValue) {
          this._arr.splice(i, 0, element);
          return;
        }
      }
      this._arr.splice(this._arr.length, 0, element);
    }
  }
};

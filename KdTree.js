module.exports = class KdTree {
  constructor(dimension) {
    this.tree = {
      point: null,
      left: null,
      right: null
    };
    this.kDiemnsion = dimension;
    this.axis = 0;
  }
  BuildKdTree(points, depth = 0) {
    let lengthOfPoints = points.length;
    if (lengthOfPoints <= 0) return null;

    this.axis = depth % this.kDiemnsion;
    let sortedPoints = points;
    if (this.axis == 0) {
      sortedPoints = points.sort(function(a, b) {
        return a.xCord - b.xCord;
      });
    } else if (this.axis == 1) {
      sortedPoints = points.sort(function(a, b) {
        return a.yCord - b.yCord;
      });
    }

    let midPoint = parseInt(lengthOfPoints / 2);
    let pivot = { xCord: 0, yCord: 0 };
    let leftBranch = new Array();
    let rightBranch = new Array();
    if (midPoint == 0) {
      pivot.xCord = sortedPoints[midPoint]["xCord"];
      pivot.yCord = sortedPoints[midPoint]["yCord"];
      leftBranch = new Array();
      rightBranch = new Array();
    } else {
      pivot.xCord = sortedPoints[midPoint - 1]["xCord"];
      pivot.yCord = sortedPoints[midPoint - 1]["yCord"];
      leftBranch = sortedPoints.slice(0, midPoint - 1);
      rightBranch = sortedPoints.slice(midPoint + 1, lengthOfPoints + 1);
    }
    return {
      point: pivot,
      left: this.BuildKdTree(leftBranch, depth + 1),
      right: this.BuildKdTree(rightBranch, depth + 1)
    };
  }
};

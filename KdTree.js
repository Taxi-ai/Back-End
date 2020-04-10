module.exports = class KdTree {
  constructor(dimension) {
    this.tree = {
      point: null,
      left: null,
      right: null,
    };
    this.kDiemnsion = dimension;
    this.axis = 0;
  }
  DistanceSquared(point1, point2) {
    let xDiff = point1.xCord - point2.xCord;
    let yDiff = point1.yCord - point2.yCord;
    return xDiff * xDiff + yDiff * yDiff;
  }
  CloserDistance(refPoint, point1, point2) {
    if (point1 == null) return point2;
    if (point2 == null) return point1;
    let distance1 = this.DistanceSquared(refPoint, point1);
    let distance2 = this.DistanceSquared(refPoint, point2);
    return distance1 > distance2 ? point2 : point1;
  }

  ClosestPointToRefPoint(root, refPoint, depth = 0) {
    if (root == null) return null;

    this.axis = depth % this.kDiemnsion;
    let labelName = "";

    if (this.axis == 0) labelName = "xCord";
    else labelName = "yCord";

    let nextBranch = null;
    let oppositeBranch = null;

    if (refPoint[labelName] < root.point[labelName]) {
      nextBranch = root.left;
      oppositeBranch = root.right;
    } else {
      nextBranch = root.right;
      oppositeBranch = root.left;
    }
    // console.log("root:", root.point);
    let bestPoint = this.CloserDistance(
      refPoint,
      this.ClosestPointToRefPoint(nextBranch, refPoint, depth + 1),
      root.point
    );

    if (
      this.DistanceSquared(refPoint, bestPoint) >
      (refPoint[labelName] - root.point[labelName]) ** 2
    ) {
      bestPoint = this.CloserDistance(
        refPoint,
        this.ClosestPointToRefPoint(oppositeBranch, refPoint, depth + 1),
        bestPoint
      );
    }
    return bestPoint;
  }

  BuildKdTree(points, depth = 0) {
    let lengthOfPoints = points.length;
    if (lengthOfPoints <= 0) {
      //console.log(points.xCord, " ", points.yCord);
      return null;
    }

    this.axis = depth % this.kDiemnsion;
    let sortedPoints = points;
    if (this.axis == 0) {
      sortedPoints = points.sort(function (a, b) {
        return a.xCord - b.xCord;
      });
    } else if (this.axis == 1) {
      sortedPoints = points.sort(function (a, b) {
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
      rightBranch = sortedPoints.slice(midPoint, lengthOfPoints + 1);
    }
    return {
      point: pivot,
      left: this.BuildKdTree(leftBranch, depth + 1),
      right: this.BuildKdTree(rightBranch, depth + 1),
    };
  }
};

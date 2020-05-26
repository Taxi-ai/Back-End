const readline = require("readline-sync");
const neatCsv = require("neat-csv");
const KdTree = require("./KdTree");
const fs = require("fs");
let points;
module.exports = {
  getClosestPoint: function (point, points) {
    let kDimension = 2;
    let pivot = point;
    const kd = new KdTree(kDimension);
    const tree = kd.BuildKdTree(points);
    // var end = "N";
    //console.log(kd.ClosestPointToRefPoint(tree, pivot));
    let finalPoint = kd.ClosestPointToRefPoint(tree, pivot);
    //console.log(finalPoint);
    return finalPoint;
  },
};

function getResult(point) {
  fs.readFile("./s1csv.csv", async (err, data, finalPoint) => {
    if (err) {
      console.error(err);
      return;
    }
    points = await neatCsv(data);
    points.forEach((element) => {
      element.xCord = parseInt(element.xCord);
      element.yCord = parseInt(element.yCord);
    });
    buildTreeAndGetClosestPoint(points, point);
  });
  console.log(points);
}

//   while (end != "Y") {
//     pivot.xCord = readline.question("What is xCord of your point?: ");
//     pivot.yCord = readline.question("What is yCord of your point?: ");
//     pivot.xCord = parseInt(pivot.xCord);
//     pivot.yCord = parseInt(pivot.yCord);
//     //console.log(pivot);
//     console.log(kd.ClosestPointToRefPoint(tree, pivot));
//     end = readline.question("PRESS Y FOR END / PRESS C FOR CONTINUE...");
//   }
// });

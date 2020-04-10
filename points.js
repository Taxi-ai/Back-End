const readline = require("readline-sync");
const neatCsv = require("neat-csv");
const KdTree = require("./KdTree");
const fs = require("fs");

fs.readFile("./s1csv.csv", async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  points = await neatCsv(data);
  points.forEach((element) => {
    element.xCord = parseInt(element.xCord);
    element.yCord = parseInt(element.yCord);
  });
  //console.log(arr);
  let kDimension = 2;
  let pivot = {};
  const kd = new KdTree(kDimension);
  const tree = kd.BuildKdTree(points);
  var end = "N";
  //console.log(kd.ClosestPointToRefPoint(tree, pivot));

  while (end != "Y") {
    pivot.xCord = readline.question("What is xCord of your point?: ");
    pivot.yCord = readline.question("What is yCord of your point?: ");
    pivot.xCord = parseInt(pivot.xCord);
    pivot.yCord = parseInt(pivot.yCord);
    //console.log(pivot);
    console.log(kd.ClosestPointToRefPoint(tree, pivot));
    end = readline.question("PRESS Y FOR END / PRESS C FOR CONTINUE...");
  }
});

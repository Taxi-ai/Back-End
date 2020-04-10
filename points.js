const neatCsv = require("neat-csv");
const KdTree = require("./KdTree");
const fs = require("fs");

fs.readFile("./s1csv.csv", async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  arr = await neatCsv(data);
  //console.log(arr);
  const kd = new KdTree(2);
  const buildTree = kd.BuildKdTree(arr);
  console.log(buildTree);
});

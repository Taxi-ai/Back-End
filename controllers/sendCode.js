const { validate } = require("../models/sendCode");

const _ = require("lodash");
const Nexmo = require("nexmo");
let verifyRequestId;

const nexmo = new Nexmo({
  apiKey: "b83fb153",
  apiSecret: "g7dBpGQkIYbbwven",
});

// Getting Users Data
exports.send = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  nexmo.verify.check(
    {
      request_id: verifyRequestId,
      code: req.body.code,
    },
    (err, result) => {
      if (err) console.log(err);
      else {
        res.send("Verified");
      }
    }
  );
};

exports.receive = async (req, res, next) => {
  nexmo.verify.request(
    {
      number: "201229728943",
      brand: "Barq",
      code_length: "4",
    },
    (err, result) => {
      if (err) console.log(err);
      else {
        verifyRequestId = result.request_id;
        console.log("request_id", verifyRequestId);
        res.send("the code has been sent to your phone");
      }
    }
  );
};

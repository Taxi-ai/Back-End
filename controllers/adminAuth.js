const { Admin } = require("../models/admin");

const bcrypt = require("bcrypt");
const Joi = require("joi");

exports.authAdmin = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let admin = await Admin.findOne({ email: req.body.email.toLowerCase() });
  if (!admin) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = admin.generateAuthToken();

  res.send(token);
};

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string()
      .min(10)
      .max(255)
      .required()
      .regex(
        /^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{7,50}$/
      ),
  });

  return schema.validate(req);
}

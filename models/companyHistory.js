const Joi = require("joi");
const mongoose = require("mongoose");

const companyHistorySchema = new mongoose.Schema({
  companyId: {
    type: String,
    ref: "Company",
    required: true,
  },
  startingDate: { type: Date, required: true },
  endingDate: { type: Date, required: true },
  offerId: { type: mongoose.Types.ObjectId },
  feedback: {
    type: {
      adminId: { type: mongoose.Types.ObjectId, required: true },
      body: { type: String, required: true },
    },
    required: false,
  },
  moneyIncome: { type: Number, min: 0, required: true },
});
const CompanyHistory = mongoose.model("CompanyHistory", companyHistorySchema);

function validateCompanyHistory(companyHistory) {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    startingDate: Joi.date().required(),
    endingDate: Joi.date().required(),
    offerId: Joi.string().allow(null),
    feedback: Joi.object({
      adminId: Joi.string().required(),
      body: Joi.string().min(10).max(255).required(),
    }).allow(null),
    moneyIncome: Joi.number().min(0).required(),
  });
  return schema.validate(companyHistory);
}

exports.CompanyHistory = CompanyHistory;
exports.validate = validateCompanyHistory;

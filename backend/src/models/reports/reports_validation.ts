import Joi from "joi";

const createReport = Joi.object({
  userName: Joi.string().required(),
  reportDate: Joi.date().required(),
  result: Joi.string().required(),
  typeOfPain: Joi.string().default("none"),
  test_id: Joi.required(),
  user_id: Joi.required(),
});


const deleteReport = Joi.object({
  _id: Joi.string().hex().length(24)
});

export default {
  createReport,
  deleteReport,

};
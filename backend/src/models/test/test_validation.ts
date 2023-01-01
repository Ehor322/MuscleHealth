import Joi from "joi";

const createTest = Joi.object({
  name: Joi.string().required(),
  testDate: Joi.date().required(),
  testTime: Joi.number().required(),
  result: Joi.string().required(),
  user_id: Joi.required(),
  power: Joi.array().required()
});

const deleteTest = Joi.object({
  _id: Joi.string().hex().length(24)
});

const search = Joi.object({
  _id: Joi.string().hex().length(24)
});

const getTest = Joi.object({
  _id: Joi.string().hex().length(24).required()
});

export default {
  createTest,
  deleteTest,
  search,
  getTest
};
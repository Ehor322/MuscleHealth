import Joi from "joi";

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const register = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  birth_date: Joi.date().required(),
  sex: Joi.string(),
});

const updatePassword = Joi.object({
  _id: Joi.string().hex().length(24),
  password: Joi.string().min(8).required(),
  new_password: Joi.string().min(8).required()
});

const getReabilitator = Joi.object({
  _id: Joi.string().hex().length(24).required()
});

const deleteReabilitator = Joi.object({
  _id: Joi.string().hex().length(24)
});

export default {
  register,
  login,
  updatePassword,
  getReabilitator,
  deleteReabilitator
};
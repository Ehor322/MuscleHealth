import Joi from "joi";

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const register = Joi.object({
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  sex: Joi.string(),
  phone: Joi.string().required(),
});

const updatePassword = Joi.object({
  _id: Joi.string().hex().length(24),
  password: Joi.string().min(8).required(),
  new_password: Joi.string().min(8).required()
});

const subscription = Joi.object({
  dayOfSubscribe: Joi.number().integer().min(1).required(),
  key: Joi.string().required(),
});
const payment = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  dayOfSubscribe: Joi.number().integer().min(1).required(),
  key: Joi.string().required(),
});

const renewalSubscription = Joi.object({
  _id: Joi.string().hex().length(24),
  dayOfSubscribe: Joi.number(),
  timeToSub: Joi.date()
});

const getUsersforReabilitator = Joi.object({
  reabilitator_id: Joi.string().hex().length(24).required()
});

const getUser = Joi.object({
  _id: Joi.string().hex().length(24).required()
});

const deleteUser = Joi.object({
  _id: Joi.string().hex().length(24)
});

export default {
  register,
  login,
  updatePassword,
  subscription,
  payment,
  renewalSubscription,
  getUsersforReabilitator,
  getUser,
  deleteUser
};
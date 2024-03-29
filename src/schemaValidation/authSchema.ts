import Joi from "joi";

const authSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().min(2).required(),
});

export default authSchema;

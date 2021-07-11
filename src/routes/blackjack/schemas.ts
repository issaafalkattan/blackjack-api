import Joi from "joi";

export const newGameSchema = Joi.object({
  data: Joi.object({
    players: Joi.array().items(Joi.string(), Joi.string()).required(),
  }),
});


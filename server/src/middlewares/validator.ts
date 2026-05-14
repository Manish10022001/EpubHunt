import { type RequestHandler } from "express";
import { z, type ZodRawShape } from "zod";
//create schema
export const emailValidationSchema = z.object({
  email: z.string({}).email("Invalid Email"),
});

//to handle type errors, will use zodrawshape
export const validate = <T extends ZodRawShape>(obj: T): RequestHandler => {
  return (req, res, next) => {
    const schema = z.object(obj);
    const result = schema.safeParse(req.body);

    if (result.success) {
      //this is so that when we transform the data, eg. we give string and covert it to number or bool or obj id, then that data will be our body data
      req.body = result.data;
      next();
    } else {
      const errors = result.error.flatten().fieldErrors;
      return res.status(422).json({ errors });
    }
  };
};

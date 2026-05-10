import type { Request, RequestHandler, Response } from "express"; //or can directly use RequestHandler for type, so we do not need request and response

export const generateAuthLink: RequestHandler = (req, res) => {
  //Generate authentication link
  //and send that link to the users email address
  res.json({ ok: true });
};

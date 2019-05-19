import { NextFunction, Request, Response } from "express-serve-static-core";
import { validationResult } from "express-validator/check";

const validation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(422).json({ errors: errors.array() });
  }
};

export default validation;

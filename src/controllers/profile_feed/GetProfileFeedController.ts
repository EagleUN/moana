import { NextFunction, Request, Response } from "express-serve-static-core";
import { check } from "express-validator/check";
import validation from "../../utils/Validator";
import GetFeed from "../../use_cases/GetFeed";

const getProfileFeedController = [
  check("userId")
    .exists()
    .isString(),
  validation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const response = await GetFeed.getFeed(userId, false);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
];

export default getProfileFeedController;

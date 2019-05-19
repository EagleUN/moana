import { NextFunction, Request, Response } from "express-serve-static-core";
import { check } from "express-validator/check";
import validation from "../../utils/Validator";
import GetHomeFeed from "../../use_cases/GetHomeFeed";

const getHomeFeedController = [
  check("userId")
    .exists()
    .isString(),
  validation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const response = await GetHomeFeed.getHomeFeed(userId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
];

export default getHomeFeedController;

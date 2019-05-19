import express from "express";
import getHomeFeedController from "../home_feed/GetHomeFeedController";

const router = express.Router();

router.get("/home/:userId", getHomeFeedController);

export default router;

import express from "express";
import getHomeFeedController from "../home_feed/GetHomeFeedController";
import getProfileFeedController from "../profile_feed/GetProfileFeedController";

const router = express.Router();

router.get("/home/:userId", getHomeFeedController);
router.get("/profile/:userId", getProfileFeedController);

export default router;

import logger from "../utils/Logger";
import queries from "../queries/Queries";
import { Follow } from "../type_orm/entity/Follow";

const log = logger("Use Case: Get Home Feed");

const getHomeFeed = async(userId: string): Promise<Follow | undefined> => {
  log.info(`Getting home feed for user with id ${userId}`);
  const result = await queries.findFollow(userId);
  return result;
};

export default {
  getHomeFeed,
};
import logger from "../utils/Logger";
import queries from "../queries/Follows";
import GetPostsForUser from "./GetPostsForUser";
import { Post } from "../type_orm/entity/Post";

const log = logger("Use Case: Get Home Feed");

const getHomeFeed = async(userId: string): Promise<Post[] | undefined> => {
  log.info(`Getting home feed for user with id ${userId}`);
  let homeFeed: Post[] = [];
  const myPosts = await GetPostsForUser.getPostsForUser(userId);
  const followedUsersPosts = await getFollowedUsersPosts(userId);

  if (myPosts) {
    myPosts.forEach((post) => { homeFeed.push(post)} );
  }
  
  followedUsersPosts.forEach((post) => { homeFeed.push(post) });

  return homeFeed;
};

const getFollowedUsersPosts = async (userId: string): Promise<Post[]> => {
  let followedUsersPosts: Post[] = [];
  const peopleFollowedByUser = await queries.findFollows(userId);
  if (peopleFollowedByUser) {
    const postsPromises = peopleFollowedByUser.map((follow) => {
      return GetPostsForUser.getPostsForUser(follow.getFollowingId());
    });

    const results = await Promise.all(postsPromises);
    results.forEach((postArray) => {
      if(postArray && postArray.length > 0) {
        postArray.forEach((post) => {
          followedUsersPosts.push(post);
        })
      }
    });
  }

  return followedUsersPosts;
}

export default {
  getHomeFeed,
};
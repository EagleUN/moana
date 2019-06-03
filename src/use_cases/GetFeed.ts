import logger from "../utils/Logger";
import followsQueries from "../queries/Follows";
import GetPostsForUser from "./GetPostsForUser";
import GetSharedPostsForUser from "./GetSharedPostsForUser";
import { Post } from "../type_orm/entity/Post";
import { Follows } from "../type_orm/entity/Follow";

const log = logger("Use Case: Get Feed");

const getFeed = async(userId: string, isHomeFeed: boolean): Promise<Post[]> => {
  const messageAux = isHomeFeed ? "home" : "profile"; 
  log.info(`Getting ${messageAux} feed for user with id ${userId}`);
  let homeFeed: Post[] = [];

  const followedUsers = await followsQueries.findFollows(userId);

  const myPosts = await GetPostsForUser.getPostsForUser(userId);
  const mySharedPosts = await GetSharedPostsForUser.getSharedPostsForUser(userId);  
  
  const followedUsersPosts = await getFollowedUsersPosts(followedUsers);
  const followedUsersSharedPosts = await getFollowedUsersSharedPosts(followedUsers);

  homeFeed = homeFeed.concat(myPosts);
  homeFeed = homeFeed.concat(mySharedPosts);
  if (isHomeFeed) homeFeed = homeFeed.concat(followedUsersPosts);
  if (isHomeFeed) homeFeed = homeFeed.concat(followedUsersSharedPosts);
  
  return homeFeed;
};

const getFollowedUsersPosts = async (peopleFollowedByUser: Follows[]): Promise<Post[]> => {
  let followedUsersPosts: Post[] = [];
  const postsPromises = peopleFollowedByUser.map((follow) => {
    return GetPostsForUser.getPostsForUser(follow.getFollowingId());
  });

  const results = await Promise.all(postsPromises);
  results.forEach((postArray) => {
    if (postArray && postArray.length > 0) {
      postArray.forEach((post) => {
        followedUsersPosts.push(post);
      });
    }
  });

  return followedUsersPosts;
}

const getFollowedUsersSharedPosts = async (peopleFollowedByUser: Follows[]): Promise<Post[]> => {
  let followedUsersSharedPosts: Post[] = [];
  const sharedPostsPromises = peopleFollowedByUser.map((follow) => {
    return GetSharedPostsForUser.getSharedPostsForUser(follow.getFollowingId());
  });

  const results = await Promise.all(sharedPostsPromises);
  results.forEach((postArray) => {
    if (postArray && postArray.length > 0) {
      postArray.forEach((post) => {
        followedUsersSharedPosts.push(post);
      });
    }
  })

  return followedUsersSharedPosts;
}

export default {
  getFeed,
};
import logger from "../utils/Logger";
import followsQueries from "../queries/Follows";
import GetPostsForUser from "./GetPostsForUser";
import GetSharedPostsForUser from "./GetSharedPostsForUser";
import { Post } from "../type_orm/entity/Post";
import { Follows } from "../type_orm/entity/Follow";
import Users from "../queries/Users";

const log = logger("Use Case: Get Feed");

const getFeed = async(userId: string, isHomeFeed: boolean): Promise<any> => {
  const messageAux = isHomeFeed ? "home" : "profile"; 
  log.info(`Getting ${messageAux} feed for user with id ${userId}`);
  let homeFeed: Post[] = [];
  const lowerUserId = userId.toLowerCase();
  const followedUsers = await followsQueries.findFollows(lowerUserId);

  const myPosts = await GetPostsForUser.getPostsForUser(userId);
  const mySharedPosts = await GetSharedPostsForUser.getSharedPostsForUser(userId);  
  
  const followedUsersPosts = await getFollowedUsersPosts(followedUsers);  
  const followedUsersSharedPosts = await getFollowedUsersSharedPosts(followedUsers);  
  homeFeed = homeFeed.concat(myPosts);
  homeFeed = homeFeed.concat(mySharedPosts);
  if (isHomeFeed) homeFeed = homeFeed.concat(followedUsersPosts);
  if (isHomeFeed) homeFeed = homeFeed.concat(followedUsersSharedPosts);
  
  const promises = homeFeed.map((post) => {
    return Users.getUser(post.getIdCreator());
  });

  const users = await Promise.all(promises);
  const homeFeedWithUserName = [];
  for (let i = 0; i < homeFeed.length; i++) {
    const postObject = {
      id: homeFeed[i].getId(),
      idCreator: users[i].name + " " + users[i].last_name,
      content: homeFeed[i].getContent(),
      createdAt: homeFeed[i].getCreatedAt(),
    }
    homeFeedWithUserName.push(postObject);
  }
  homeFeedWithUserName.sort(function(a, b) {
    const date1 = new Date(a.createdAt);
    const date2 = new Date(b.createdAt);
    return date1.getTime()-date2.getTime();
  });
  return homeFeedWithUserName;
};

const getFollowedUsersPosts = async (peopleFollowedByUser: Follows[]): Promise<Post[]> => {
  let followedUsersPosts: Post[] = [];
  const postsPromises = peopleFollowedByUser.map((follow) => {
    return GetPostsForUser.getPostsForUser(follow.getFollowingId().toUpperCase());
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
    return GetSharedPostsForUser.getSharedPostsForUser(follow.getFollowingId().toUpperCase());
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
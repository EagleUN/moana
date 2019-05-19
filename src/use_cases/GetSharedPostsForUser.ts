import { Post } from "../type_orm/entity/Post";
import sharesQueries from "../queries/Shares";
import postQueries from "../queries/Posts";

const getSharedPostsForUser = async(userId: string): Promise<Post[]> => {
  let sharedPosts: Post[] = [];
  const shareObjects = await sharesQueries.findSharedPostsByUserId(userId);
  if (shareObjects) {
    const postsPromises = shareObjects.map((share) => {
      return postQueries.findPostById(share.getPostId());
    });
    
    const result = await Promise.all(postsPromises);
    result.forEach((post) => {
      if (post) {
        sharedPosts.push(post);
      }
    });
  }
  return sharedPosts;
}

export default {
  getSharedPostsForUser,
};

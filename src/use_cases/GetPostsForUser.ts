import postsQueries from "../queries/Posts";
import { Post } from "../type_orm/entity/Post";

const getPostsForUser = async(userId: string): Promise<Post[]> => {
  const postsAssociatedToUser = await postsQueries.findPostsByCreatorId(userId);
  return postsAssociatedToUser;
}

const getPostById = async(postId: string): Promise<Post | undefined> => {
  const post = await postsQueries.findPostById(postId);
  return post;
}

export default {
  getPostsForUser,
  getPostById,
};

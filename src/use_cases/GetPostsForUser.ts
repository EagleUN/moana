import queries from "../queries/Posts";
import { Post } from "../type_orm/entity/Post";

const getPostsForUser = async(userId: string): Promise<Post[] | undefined> => {
  const postsAssociatedToUser = await queries.findPostsByCreatorId(userId);
  return postsAssociatedToUser;
}

const getPostById = async(postId: string): Promise<Post | undefined> => {
  const post = await queries.findPostById(postId);
  return post;
}

export default {
  getPostsForUser,
  getPostById,
};

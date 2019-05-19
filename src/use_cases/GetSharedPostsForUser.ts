import { Post } from "../type_orm/entity/Post";

const getSharedPostsForUser = async(userId: string): Promise<Post> => {
  return new Post(new Date(), userId, "some content");
}

export default {
  getSharedPostsForUser,
};

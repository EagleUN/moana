import { Connection } from "typeorm";
import { connectionPromise } from "../type_orm/Basics";
import { Post } from "../type_orm/entity/Post";

const findPostsByCreatorId = async(idCreator: string): Promise<Post[] | undefined> => {
  const connection: Connection = await connectionPromise;
  const result = await connection.getRepository(Post)
                                 .createQueryBuilder("post")
                                 .where("post.idCreator = :id", { id: idCreator })
                                 .getMany();
  return result;
}

const findPostById = async(postId: string): Promise<Post | undefined> => {
  const connection: Connection = await connectionPromise;
  const results = await connection.getRepository(Post)
                                  .createQueryBuilder("post")
                                  .where("post.id = :id", { id: postId })
                                  .getOne();
  return results;
}

export default {
  findPostsByCreatorId,
  findPostById,
};

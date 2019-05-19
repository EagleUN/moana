import { Connection } from "typeorm";
import { connectionPromise } from "../type_orm/Basics";
import { Post } from "../type_orm/entity/Post";

const findPostsByCreatorId = async(idCreator: string): Promise<Post[]> => {
  const connection: Connection = await connectionPromise;
  const result = await connection.getRepository(Post)
                                 .createQueryBuilder("post")
                                 .where("post.idCreator = :id", { id: idCreator })
                                 .getMany();
  return result;
}

const findPostById = async(postId: string): Promise<Post | undefined> => {
  const connection: Connection = await connectionPromise;
  const result = await connection.getRepository(Post)
                                  .createQueryBuilder("post")
                                  .where("post.id = :id", { id: postId })
                                  .getOne();
  return result;
}

export default {
  findPostsByCreatorId,
  findPostById,
};

import { Connection } from "typeorm";
import { connectionPromise } from "../type_orm/Basics";
import { Follow } from "../type_orm/entity/Follow";

const findFollow = async(idFollower: string): Promise<Follow | undefined> => {
  const connection: Connection = await connectionPromise;
  const result = await connection.getRepository(Follow)
                                 .createQueryBuilder("follow")
                                 .where("follow.follower_id = :id", { id: idFollower })
                                 .getOne();
  return result;
}

export default {
  findFollow,
};

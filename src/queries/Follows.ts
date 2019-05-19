import { Connection } from "typeorm";
import { connectionPromise } from "../type_orm/Basics";
import { Follows } from "../type_orm/entity/Follow";

const findFollows = async(idFollower: string): Promise<Follows[] | undefined> => {
  const connection: Connection = await connectionPromise;
  const result = await connection.getRepository(Follows)
                                 .createQueryBuilder("follows")
                                 .where("follows.follower_id = :id", { id: idFollower })
                                 .getMany();
  return result;
}

export default {
  findFollows,
};

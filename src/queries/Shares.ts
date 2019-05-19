import { Share } from "../type_orm/entity/Share";
import { Connection } from "typeorm";
import { connectionPromise } from "../type_orm/Basics";

const findSharedPostsByUserId = async(userId: string): Promise<Share[]> => {
  const connection: Connection = await connectionPromise;
  const result = await connection.getRepository(Share)
                                 .createQueryBuilder("share")
                                 .where("share.userId = :id", { id: userId })
                                 .getMany();
  return result;
}

export default {
  findSharedPostsByUserId,
};

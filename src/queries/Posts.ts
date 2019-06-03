import { Connection } from "typeorm";
import { connectionPromise } from "../type_orm/Basics";
import { Post } from "../type_orm/entity/Post";
import axios from "axios";

const API_URL = 'http://35.232.95.82:5000/graphql';

const findPostsByCreatorId = async(idCreator: string): Promise<Post[]> => {
  const connection: Connection = await connectionPromise;
  const result = await connection.getRepository(Post)
                                 .createQueryBuilder("post")
                                 .where("post.idCreator = :id", { id: idCreator })
                                 .getMany();
  return result;
}

const findPostById = async(postId: string): Promise<Post | undefined> => {
  let body =  { 
    query: `
      query {
          postById(id:"${postId}") {
            id
            idCreator
            content
            createdAt
          }
      }
    `, 
    variables: {}
  }
  let options = {
    headers: {
        'Content-Type': 'application/json'
    }
  }
  const data = await axios.post(API_URL,body, options)
  if(data.data.data){
    const post = data.data.data.postById;
    const ormPost = new Post(post.createdAt, post.idCreator, post.content);
    ormPost.setId(postId);
    return ormPost;
  }
  return undefined;
}

export default {
  findPostsByCreatorId,
  findPostById,
};

import { Post } from "../type_orm/entity/Post";
import axios from "axios";

const API_URL = 'http://35.232.95.82:5000/graphql';

const findPostsByCreatorId = async(idCreator: string): Promise<Post[]> => {
  let body =  { 
    query: `
      query {
          postsByCreatorId(id:"${idCreator}") {
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
  const data = await axios.post(API_URL,body, options);
  if(data.data.data){
    const posts = data.data.data.postsByCreatorId;
    const ormPosts = posts.map((post: any) => {
      const postAux = new Post(post.createdAt, post.idCreator, post.content);
      postAux.setId(post.id);
      return postAux;
    });
    return ormPosts;
  }
  return [];
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

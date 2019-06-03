import { Post } from "../type_orm/entity/Post";
import postQueries from "../queries/Posts";
import axios from 'axios';
import { Share } from '../type_orm/entity/Share';

const API_URL = 'http://35.232.95.82:5000/graphql';

const getSharedPostsForUser = async(userId: string): Promise<Post[]> => {
  let body =  { 
      query: `
          query {
              sharesByUser(userId:"${userId}") {
                  postId
                  userId
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
    const shareObjects: Share[] = data.data.data.sharesByUser.map((object: any) => {
      return new Share(object.userId, object.postId);
    });
    let sharedPosts: Post[] = [];
    if (shareObjects) {
      const postsPromises = shareObjects.map((share) => {
        return postQueries.findPostById(share.getPostId());
      });
      
      const result = await Promise.all(postsPromises);
      result.forEach((post) => {
        if (post) {
          sharedPosts.push(post);
        }
      });
    }
    return sharedPosts;
  }
  return [];
}

export default {
  getSharedPostsForUser,
};

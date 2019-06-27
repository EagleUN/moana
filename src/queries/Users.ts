import axios from "axios";

const API_URL = 'http://35.232.95.82/graphql';

const getUser = async (userId: string): Promise<any> => {
  let body =  { 
    query: `
      query {
        userById(id: {id: "${userId}"}){
          id
          email
          name
          last_name
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
    const user = data.data.data.userById;
    return user;
  }
  return {};
}

export default {
  getUser,
}

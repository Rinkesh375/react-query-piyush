import axios from "axios"

const fetchPosts = async()=>{
  const res = await axios.get(`http://localhost:8080/posts?_sort=id&_order=desc`);
   
  if(res.status !== 200)   throw new Error(`Failed to fetch posts. Status: ${res.status}`);
  return res;
}


const fetchTags = async()=>{
    const req = await  fetch(`http://localhost:8080/tags?_sort=-id`);
    const res = await req.json();
     return res;
 
  }

const addPost = async(post)=>{
  const  req = await fetch(`http://localhost:8080/posts`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
  return req.json();

}  




export {fetchPosts,fetchTags, addPost}
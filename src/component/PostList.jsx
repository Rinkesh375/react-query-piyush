import React from 'react';
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import { addPost, fetchPosts, fetchTags } from '../serverRequest/api';

const PostList = () => {

    const queryClient = useQueryClient();
    const {data,isError,isLoading,error} = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts
    })

    const {
        mutate,
        isPending,
        isError: isPostError,
    } = useMutation({mutationFn:addPost,
    
        onSuccess: () => {
            queryClient.invalidateQueries({
              
              queryKey: ["posts"],
             
           
            });
      
           
          },
        });

    const {data:tags} = useQuery({
        queryKey: ['tags'],
        queryFn: fetchTags,
        staleTime:Infinity
    })
    const handleFormSubmit = (e)=>{
         e.preventDefault();
         const formData = new FormData(e.target);
         const title = formData.get("title");
         const tags = Array.from(formData.keys()).filter(
           (key) => formData.get(key) === "on"
         );
     
         if (!title || !tags) return;
         mutate({title,tags});
    }

    
     

       
 
    return (
      
        <>
     <form onSubmit={handleFormSubmit}>
   
        <input
          type="text"
          placeholder="Enter your post.."
          className="postbox"
          name="title"
        />
        <div className="tags">
          {tags?.map((tag) => {
            return (
              <div key={tag}>
                <input name={tag} id={tag} type="checkbox" />
                <label htmlFor={tag}>{tag}</label>
              </div>
            );
          })}
        </div>
        <button type='submit'>Post</button>
        {/* <button disabled={isPending}>
          {isPending ? "Posting..." : "Post"}
        </button> */}
      </form>

        <hr />
       <div>

        {data?.data?.map((post) => {
             return (
               <div key={post.id} className="post">
                 <div>{post.title}</div>
                 {post.tags.map((tag) => {
                   return <span key={tag}>{tag}</span>;
                 })}
               </div>
             );
           })}
       </div>
        </>
    )
}

export default PostList;

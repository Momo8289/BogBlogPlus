//page for individual posts
import { useLoaderData } from "react-router-dom";

export default function PostDetails() {
  const post = useLoaderData();
  console.log("Post inside component:", post);
  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="post-details">
      <h2>{post.title}</h2>
      <br></br>
      <p><strong>By:</strong> {post.author.username}</p>
      <p><strong>Posted on:</strong> {new Date(post.author.created_on).toLocaleString()}</p>
      <br></br>
      <div>{post.body}</div>
    </div>
  );
}


export async function postDetailLoader({params}){
    
    const token = localStorage.getItem("token");
  
    const response = await fetch(`http://127.0.0.1:5055/api/post/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await response.json();
    console.log("Fetched post:", data);
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch post.");
    }
  
    return data; 
  }

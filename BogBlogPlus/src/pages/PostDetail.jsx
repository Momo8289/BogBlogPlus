//page for individual posts
import { useLoaderData } from "react-router-dom";
import DeletePost from "../components/DeletePost";
import bannerUrl from '/src/assets/SVG/banner.svg';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPost } from "../utils/api";

export default function PostDetails() {
  const post = useLoaderData();
  //console.log("Post inside component:", post);
  if (!post) {
    return <p>Post not found.</p>;
  }
 // console.log(post.author.id , Number(localStorage.getItem("userId")));

  return (
    <>
    <div className="postDetailPage">
    <div className="post-details">
      <h2>{post.title}</h2>
      <br></br>
      <p ><strong>By:</strong> <Link to={`/user/${post.author.id}/posts`}>{post.author.username}</Link></p>
      <p><strong>Posted on:</strong> {new Date(post.timestamp).toLocaleString()}</p>
      <br></br>
      <div>{post.body}</div>
      <br></br>
      {post.author.id === Number(localStorage.getItem("userId")) && (<><DeletePost postId={post.id} /> <Link to={`/post/${post.id}/edit`}><button className="editButton">Edit Post</button></Link></>)}

    </div>
      <motion.img
      src={bannerUrl}
      alt="Banner"
      className="svg-banner"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    />
    </div>
</>    
  );
}


export async function postDetailLoader({params}){
    
    const token = localStorage.getItem("token");
    const id = params.id;
  
    const response = await getPost(token, id );
  
    const data = await response
   // console.log("Fetched post:", data);
    if (!response) {
      throw new Error(data.message || "Failed to fetch post.");
    }
  
    return data; 
  }

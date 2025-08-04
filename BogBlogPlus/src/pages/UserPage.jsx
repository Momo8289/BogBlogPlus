import { motion } from "framer-motion";
import { Link, useLoaderData } from "react-router-dom";


function UserPage(){
    const userPosts = useLoaderData();
    console.log("userPosts in component:", userPosts);
return(
    <div className="blogContent">
   
    {userPosts.map(post =>  <div className="card " key={post.id}>
         <Link to={`/post/${post.id}`}><h4>{post.title}</h4></Link>
         <p ><strong>By:</strong> {post.author.username}</p>
         <p><strong>Posted on:</strong> {new Date(post.timestamp).toLocaleString()}</p>
         </div>)}
    
    </div>
)

}
function UserPageHome(){
 
  return(
 <div className="userPage">
      <motion.div
        className="lilypad-background"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    <UserPage />
     
     </div>
  );
  
}
export async function userPostDetailLoader({ params }) {
    const token = localStorage.getItem("token");
    if (!token) return [];
  
    const response = await fetch(`http://127.0.0.1:5055/api/user/${params.id}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    const data = await response.json();
    if (!response.ok) return [];
  
    console.log("Loader received from API:", data); // ✅ THIS SHOWS 8 posts
  
    return data; // ✅ RETURNING JUST posts
  }
  
  
export default UserPageHome;

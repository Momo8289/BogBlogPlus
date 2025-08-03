import {Link, useLoaderData} from 'react-router-dom'
import {motion} from 'framer-motion';


function BlogPosts(){
    const posts = useLoaderData();
    
    return(
        <div className="blogContent">
       
        {posts.map(post =>  <div className="card " key={post.id}>
             <Link to={`/post/${post.id}`}><h4>{post.title}</h4></Link>
             <p ><strong>By:</strong> <Link to={`/user/${post.author.id}/posts`}>{post.author.username}</Link></p>
             <p><strong>Posted on:</strong> {new Date(post.timestamp).toLocaleString()}</p>
             </div>)}
        
        </div>
    )
}

export default function Home() {
    return (
      <div className="homePage">
        <motion.div
        className="lilypad-background"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <BlogPosts />
    </div>
  );
}

//fetch and load data
export async function postsLoader() {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found");
        return [];
      }
  
    const response = await fetch("http://127.0.0.1:5055/api/post", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await response.json(); 
  
    if (!response.ok) {
      console.error("Fetch failed:", data);
      return [];
    }
  
    console.log("Posts fetched:", data);
    return data.posts;
  }
  
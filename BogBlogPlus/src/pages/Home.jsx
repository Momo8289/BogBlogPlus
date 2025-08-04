import {Link, useLoaderData} from 'react-router-dom'
import {motion} from 'framer-motion';
import { getPosts } from '../utils/api';
import Logo from '../assets/SVG/Logo.svg'

function BlogPosts(){
    const posts = useLoaderData();
    const token = localStorage.getItem("token");
    if(!token){
        return(
          <>
          <div className='welcomeMsg'>
            <img src={Logo} className='welcomeLogo'></img>
          <h1>Welcome New Friend</h1>
          <br></br>
          <h2><Link to = "/register">Join Us</Link> &nbsp; Or &nbsp; 
          <Link  to ="/login" >Log In</Link></h2>
          </div>
          </>
        )
    }
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
       // console.error("No token found");
        return [];
      }
  
    const response = getPosts(token);
  
    const data = await response; 
  
    if (!response) {
      console.error("Fetch failed:", data);
      return [];
    }
  
    console.log("Posts fetched:", data);
    return data.posts;
  }
  
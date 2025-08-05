import Posts from "../components/Posts.jsx";

import {Link, useLoaderData} from 'react-router-dom'
import {motion} from 'framer-motion';
import { getPosts } from '../utils/api';
import Logo from '../assets/SVG/Logo.svg'

function BlogPosts() {
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
            <Posts posts={posts} />
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
export async function PostsLoader() {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found");
        return [];
    }
    try {
        const {data} = await getPosts(token)
        return data.posts;
    } catch (err) {
        console.error("Fetch failed:", err);
        return [];
    }

}
  
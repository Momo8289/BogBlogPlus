import { motion } from "framer-motion";
import { Link, useLoaderData } from "react-router-dom";
import {getUser, getUserLikes, getUserPosts} from "../utils/api.js";
import Posts from "../components/Posts.jsx";

function UserPage() {
    const {posts: userPosts, likes, id, user} = useLoaderData();
    console.log(userPosts, likes, id, user)
    console.log("userPosts in component:", userPosts);
    return (
        <>
        <div className="userPageBanner">
            <h1>{likes ? "Liked" : "Posts"} by {user.username}</h1>
            <h3><Link to={`/user/${id}/${likes? 'posts' : 'likes'}`}>View {likes ? "posts" : "likes"}</Link></h3>
            <Posts posts={userPosts} />
        </div>
        </>
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

export async function UserLikedPostLoader({params}) {
    const token = localStorage.getItem("token");
    if(!token) return [];
    const [{data}, {data: userData}] = await Promise.all([
        getUserLikes(token, params.id),
        getUser(token, params.id)
    ])
    return {posts: data, likes: true, id: params.id, user: userData}
}

export async function UserPostDetailLoader({params}) {
    const token = localStorage.getItem("token");
    if (!token) return [];

    const [{data}, {data: userData}] = await Promise.all([
        getUserPosts(token, params.id),
        getUser(token, params.id)
    ])
    return {posts: data, likes: false, id: params.id, user: userData}
}


export default UserPageHome;

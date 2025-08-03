import {Link, useLoaderData} from "react-router-dom";
import {getUserPosts} from "../utils/api.js";

function UserPage() {
    const userPosts = useLoaderData();
    console.log("userPosts in component:", userPosts);
    return (
        <div className="blogContent">

            {userPosts.map(post => <div className="card " key={post.id}>
                <Link to={`/post/${post.id}`}><h4>{post.title}</h4></Link>
                <p><strong>By:</strong> {post.author.username}</p>
                <p><strong>Posted on:</strong> {new Date(post.timestamp).toLocaleString()}</p>
            </div>)}

        </div>
    )

}

function UserPageHome() {
    return <UserPage/>
}

export async function UserPostDetailLoader({params}) {
    const token = localStorage.getItem("token");
    if (!token) return [];

    const {data} = await getUserPosts(token, params.id)
    console.log("Loader received from API:", data); // ✅ THIS SHOWS 8 posts

    return data; // ✅ RETURNING JUST posts
}


export default UserPageHome;

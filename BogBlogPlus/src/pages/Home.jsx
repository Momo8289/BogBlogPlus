import {Link, useLoaderData} from 'react-router-dom'
import {getPosts} from "../utils/api.js";


function BlogPosts() {
    const posts = useLoaderData();

    return (
        <div className="blogContent">

            {posts.map(post => <div className="card " key={post.id}>
                <Link to={`/post/${post.id}`}><h4>{post.title}</h4></Link>
                <p><strong>By:</strong> <Link to={`/user/${post.author.id}/posts`}>{post.author.username}</Link></p>
                <p><strong>Posted on:</strong> {new Date(post.timestamp).toLocaleString()}</p>
            </div>)}

        </div>
    )
}

export default function Home() {
    return (
        <BlogPosts/>
    )
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
  
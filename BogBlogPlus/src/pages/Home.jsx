import {useLoaderData} from 'react-router-dom'
import {getPosts} from "../utils/api.js";
import Posts from "../components/Posts.jsx";


function BlogPosts() {
    const posts = useLoaderData();

    return (
        <Posts posts={posts} />
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
  
//page for individual posts
import {useLoaderData, useNavigate} from "react-router-dom";
import DeletePost from "../components/DeletePost";
import {getPost} from "../utils/api.js";
import LikeButton from "../components/LikeButton.jsx";
import CommentSection from "../components/CommentSection.jsx";

export default function PostDetails() {
    const post = useLoaderData();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const currentUserId = Number(localStorage.getItem("userId"));

    if (!post) {
        return <p>Post not found.</p>;
    }
    console.log(post.author.id, Number(localStorage.getItem("userId")));

    const handleGoBack = () => {
        navigate(-1); // takes the user back to the previous page
    };

    return (
        <div className="post-details">

            <button onClick={handleGoBack} className="back-button">
                ← Back
            </button>

            <h2>{post.title}</h2>
            <br></br>
            <p><strong>By:</strong> {post.author.username}</p>
            <p><strong>Posted on:</strong> {new Date(post.author.created_on).toLocaleString()}</p>
            <br></br>
            <div>{post.body}</div>
            <br></br>
            {post.author.id === Number(localStorage.getItem("userId")) ?
                <DeletePost postId={post.id}/>
                :
                <LikeButton postId={post.id} liked={post.liked} likes={post.likes} />
            }

            <CommentSection 
                postId={post.id} 
                token={token}
                currentUserId={currentUserId}
                isExpanded={true} 
            />
        </div>
    );
}


export async function PostDetailLoader({params}) {

    const token = localStorage.getItem("token");

    const {data} = await getPost(token, params.id);
    console.log("Fetched post:", data);

    return data;
}

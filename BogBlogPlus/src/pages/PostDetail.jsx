//page for individual posts
import {useLoaderData, useNavigate} from "react-router-dom";
import DeletePost from "../components/DeletePost";
import bannerUrl from '/src/assets/SVG/banner.svg';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPost } from "../utils/api";
import LikeButton from "../components/LikeButton.jsx";
import CommentSection from "../components/CommentSection.jsx";
import {EditPostButton} from "./EditPost";

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
        <div className="postDetailPage">
            <div className="post-details">

                <button onClick={handleGoBack} className="back-button">
                    ← Back
                </button>

                <h2>{post.title}</h2>
                <br></br>
                <p><strong>By:</strong> <Link to={`/user/${post.author.id}/posts`}>{post.author.username}</Link></p>
                <p><strong>Posted on:</strong> {new Date(post.author.created_on).toLocaleString()}</p>
                <br></br>
                <div className="postBody">{post.body}</div>
                <br></br>
                {post.author.id === Number(localStorage.getItem("userId")) ?
                    <>
                    <DeletePost postId={post.id}/> &nbsp;
                    <EditPostButton postId={post.id}/>
                      </>
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
            <motion.img
                src={bannerUrl}
                alt="Banner"
                className="svg-banner"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
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

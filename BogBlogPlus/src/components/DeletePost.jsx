
import { useNavigate } from "react-router-dom";
import {deletePost} from "../utils/api.js";

function DeletePost({ postId }) {
    const navigate = useNavigate();

    const deletePostHandler = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const {response, data} = await deletePost(token, postId);

            if (!response.ok) {
                console.error("Failed to delete post:", data.message || response.statusText);
                return;
            }

            console.log("Post deleted successfully");
            // redirect to homepage or user's post list
            navigate("/");
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <button className="deleteButton" onClick={deletePostHandler}>
            Delete Post
        </button>
    );
}

export default DeletePost;

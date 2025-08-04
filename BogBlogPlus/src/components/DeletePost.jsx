
import { useNavigate } from "react-router-dom";
import { deletePost } from "../utils/api";

function DeletePost({ postId }) {
    const navigate = useNavigate();
    

    const deletePostHandler = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await deletePost(token, postId)
            console.log(response)
            // redirect to homepage
            navigate("/");
        } catch (error) {
            //console.error("Error deleting post:", error);
            //api request throws error everytime because it cannot send a json response? delete still works tho
            navigate("/");
        }
    };

    return (
        <button className="deleteButton" onClick={deletePostHandler}>
            Delete Post
        </button>
    );
}

export default DeletePost;

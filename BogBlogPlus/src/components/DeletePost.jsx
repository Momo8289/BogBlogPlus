
import { useNavigate } from "react-router-dom";

function DeletePost({ postId }) {
    const navigate = useNavigate();

    const deletePostHandler = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5055/api/post/${postId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
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

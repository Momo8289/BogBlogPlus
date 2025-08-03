import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ApiError, createPost} from "../utils/api.js";

export default function NewPost() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in to create a post.");
            return;
        }
        try {
            await createPost(token, title, body)
            navigate("/"); // redirect to home

        } catch (err) {
            if(err instanceof ApiError) {
                setError("Failed to create post.");
            } else {
                throw err;
            }
        }
    };

    return (
        <div className="new-post-container">
            {error && <p style={{color: "red"}}>{error}</p>}

            <form onSubmit={handleSubmit} className="post-form">
                <div>
                    <label>Title:</label><br/>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Content:</label><br/>
                    <textarea
                        rows="6"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Post</button>
            </form>
        </div>
    );
}

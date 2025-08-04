import { useLoaderData } from "react-router-dom";
import DeletePost from "../components/DeletePost";
import bannerUrl from '/src/assets/SVG/banner.svg';
import { motion } from "framer-motion";
import { getPost, updatePost } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function EditPost(){
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState("");
    const post = useLoaderData();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to create a post.");
          return;
        }
    
        const response =updatePost(token, post.id, body);
        const data = await response;
    
        if (response) {
          navigate("/"); // redirect to home
        } else {
          setError(data.message || "Failed to create post.");
        }
      };
    if (!post) {
      return <p>Post not found.</p>;
    }
    //console.log(post.author.id , Number(localStorage.getItem("userId")));

    return (
        <div className="editPostPage">
        <div className="new-post-container">
          {error && <p style={{ color: "red" }}>{error}</p>}
    
          <form onSubmit={handleSubmit} className="post-form">
            <div>
              <label>Title:</label><br />
              <input
                type="text"
                value={title}
                placeholder={post.title}
                onChange={(e) => setTitle(e.target.value)}
                disabled
                required
              />
            </div>
    
            <div>
              <label>Content:</label><br />
              <textarea
                rows="6"
                defaultValue={post.body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>
    
            <button type="submit">Post</button>
          </form>
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

    export async function postDetailLoader({params}){
        const id = params.id;
        const token = localStorage.getItem("token");
      
        const response = getPost(token, id);
      
        const data = await response;
        console.log("UPDATED post:", data);
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch post.");
        }
      
        return data; 
      }
    
export default EditPost;
import { currentUser, updateUser, getUserPosts } from "../utils/api";
import Frog from'../assets/SVG/Frog.svg';
import {motion} from 'framer-motion'
import { useState } from "react";
import { useLoaderData } from "react-router";
import { useNavigate } from "react-router-dom";
import AccountPageArt from "../components/AccountPageArt";

function UserEdit(){
const navigate = useNavigate();
const { user, posts } = useLoaderData();
const [username, setUsername] = useState(user.username);
const [editPassword, setEditPassword] = useState(false);
const [password, setPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [error, setError] = useState("");

const editAccountHandler = async (e) => {

    e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    setError("You must be logged in.");
    return;
  }

  if (!username || username.length > 64) {
    setError("Username must not be empty and must be under 64 characters.");
    return;
  }

  if (editPassword) {
    if (!password || !newPassword || !confirmPassword) {
      setError("All password fields are required.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
  }

  try {
    await updateUser(
      token,
      username,
      editPassword ? password : null,
      editPassword ? newPassword : null
    );

    //alert("Account successfully updated.");
    navigate("/"); // or reload the page if you want to reflect changes
  } catch (err) {
    //console.error(err);
    setError(`Update failed: ${err.message}`);
  }
};



return(
    <>
 <div className="accountPage">

    <div className="accountContainer">
        
         <div className="accountInfoDisplay">
        
       
        <div className="accountInfoCard ">
         <h3>Username:  &nbsp;{user.username}</h3>
         <br></br><br></br>
         <h5>Member since: {new Date(user.created_on).toLocaleString()}</h5>
         <br></br>
         <h5>Number of Bog Blog Posts: {posts.length}</h5>
        </div>
    </div>
    <div className="editAccount">
  <form className="editAcctForm" onSubmit={editAccountHandler}>
    <h3>Edit Username</h3>
     <br></br>
     {error && <p style={{ color: "red" }}>{error}</p>}
    <label htmlFor="username">New Username:</label>
    <input
      id="username"
      type="text"
      defaultValue={user.username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />

    <div className="passwordToggle">
      <label>
        <input
          type="checkbox"
          checked={editPassword}
          onChange={() => setEditPassword(!editPassword)}
        />
        Edit Password?
      </label>
    </div>

    {editPassword && (
      <>
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          id="currentPassword"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br></br>
        <label htmlFor="newPassword">New Password:</label>
        <input
          id="newPassword"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <br></br>
        <label htmlFor="confirmPassword">Confirm New Password:</label>
        <input
          id="confirmPassword"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </>
    )}
    <br></br>
    <button type="submit">Save Changes</button>
  </form>
</div>
    </div>
   
    
    <div className="accountArt">
        <motion.div className="frameForFrog"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
            <div className="accountFrog">
                   <AccountPageArt />
            </div>
       
        </motion.div>
    </div>
    
 </div>
    
    </>
)
}

export async function userDetailLoader(){
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token");
  
    const user = await currentUser(token);
  
    if (!user || !user.id) throw new Error("User not found");
  
    const posts = await getUserPosts(token, user.id);

    return { user: await user,
        posts: await posts,
      };//LikeInfo, CommentInfo

}

export default UserEdit;
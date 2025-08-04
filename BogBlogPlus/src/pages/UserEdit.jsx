import { currentUser, updateUser, getUserPosts } from "../utils/api";
import Frog from'../assets/SVG/Frog.svg';
import {motion} from 'framer-motion'
import { useLoaderData } from "react-router";

function UserEdit(){
const { user, posts } = useLoaderData();




return(
    <>
 <div className="accountPage">

    <div className="accountContainer">
        
         <div className="accountInfoDisplay">
        
       
        <div className="accountInfoCard ">
         <h3>Username: {user.username}</h3>
         <br></br>
         <h5>Member since: {new Date(user.created_on).toLocaleString()}</h5>
         <h5>Number of Bog Blog Posts: {posts.length}</h5>
        </div>
    </div>
    <div className="editAccount">
       <form>
        <h3>Edit Account</h3>
        <br></br>
        <label>New Username: </label>
        <input
          type="text"
        defaultValue={user.username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br></br>
        <label>Password: </label>
        <input
          type="password"
        //   value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Save Changes</button>
        </form>
    </div>
    </div>
   
    
    <div className="accountArt">
        <div className="frameForFrog">
            <div className="accountFrog">
                    <img src={Frog} />
            </div>
        </div>
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
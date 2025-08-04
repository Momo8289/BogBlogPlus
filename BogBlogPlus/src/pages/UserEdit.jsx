import { currentUser, updateUser } from "../utils/api";
import Frog from'../assets/SVG/Frog.svg';
import {motion} from 'framer-motion'
import { useLoaderData } from "react-router";

function UserEdit(){
const user = useLoaderData();


return(
    <>
 <div className="accountPage">
    
    <div className="accountContainer">
        
         <div className="accountInfoDisplay">
        
        <p>account information here</p>
     {/* display current user name, time account created, number of posts, comments and likes */}

    </div>
    <div className="editAccount">
       <form>
        <label>Username</label>
        <input
          type="text"
        //   defaultValue={user.username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
        //   value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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

export function userDetailLoader(){
    const token = localStorage.getItem("token");

    const response = currentUser(token)

}

export default UserEdit;
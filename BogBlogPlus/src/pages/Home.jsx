import {Link, useLoaderData} from 'react-router-dom'


function BlogPosts(){
    const posts = useLoaderData();
    
    return(
        <div className="blogContent">
       
        {posts.map(post =>  <div className="card " key={post.id}>
             <Link to="/"><h4>{post.title}</h4></Link>
             <p >By: {post.author.username}</p>
             <p>Posted on: {post.author.created_on}</p>
             </div>)}
        
        </div>
    )
}

export default function Home() {
    return (
                <BlogPosts />
    )
}

//fetch and load data
export async function postsLoader() {
    const token = localStorage.getItem("token");
  
    const response = await fetch("http://127.0.0.1:5055/api/post", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await response.json(); 
  
    if (!response.ok) {
      console.error("Fetch failed:", data);
      return [];
    }
  
    console.log("Posts fetched:", data);
    return data.posts;
  }
  
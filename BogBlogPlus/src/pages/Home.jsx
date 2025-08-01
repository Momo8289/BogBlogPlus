import {useLoaderData} from 'react-router'

function BlogPosts(){
    const posts = useLoaderData();
    
    return(
        <div className="container">
       
        {posts.map(post =>  <div className="card"><p key={post.id}>{post.body}</p></div>)}
        
        </div>
    )
}

export default function Home() {
    return (
        <>
            <h1>Home</h1>
           <BlogPosts />
        </>
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
  
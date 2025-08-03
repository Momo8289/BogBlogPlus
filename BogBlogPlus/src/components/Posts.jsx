import {Link} from "react-router-dom";

export default function Posts({posts}) {
    return (
        <div className="blogContent">
            {posts.length === 0 ?
                <h1>No posts</h1>
                :
                <>
                    {
                        posts.map(post => <div className="card " key={post.id}>
                            <Link to={`/post/${post.id}`}><h4>{post.title}</h4></Link>
                            <p><b>By:</b> <Link to={`/user/${post.author.id}/posts`}>{post.author.username}</Link></p>
                            <p><b>Posted on:</b> {new Date(post.timestamp).toLocaleString()}</p>
                            <p><b>Likes:</b> {post.likes}</p>
                        </div>)
                    }
                </>

            }
        </div>
    )
}
import {
    createBrowserRouter, RouterProvider
} from "react-router-dom";
import './App.css'
import Home, {PostsLoader} from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PostDetails, {PostDetailLoader} from "./pages/PostDetail.jsx";
import Layout from "./components/Layout.jsx";
import NewPost from "./pages/NewPost";
import UserPageHome, {UserLikedPostLoader, UserPostDetailLoader} from "./pages/UserPage";
import EditPost from "./pages/EditPost";
import UserEdit, {UserDetailLoader} from "./pages/UserEdit";
import Error from "./pages/Error.jsx";


//make pages for main blog pages (all posts), blog post (singular), login, home, loading, error
// single user blog will be main blog page with just users posts
// create header/nav bar for top and footer bar for bottom of each page - included in layout
//add routing 
//study api call readme for how to get data


function App() {
    const router = createBrowserRouter([
        //handle will contain the value passed into the navbar for the title generation
        {
            path: "/",
            element: <Layout/>,
            errorElement: <Error />,
            children: [
                {index: true, element: <Home/>, loader: PostsLoader, handle: {title: "Bog Blog"}},
                {path: "/post/:id", element: <PostDetails/>, loader: PostDetailLoader, handle: {title: "Post Details"}},
                {path: "/login", element: <Login/>, handle: {title: "Login"}},
                {path: "/register", element: <Register/>, handle: {title: "Register"}},
                {path: "/new", element: <NewPost/>, handle: {title: "New Post"}},
                {
                    path: "/user/:id/posts",
                    element: <UserPageHome/>,
                    loader: UserPostDetailLoader,
                    handle: {title: "User Posts"}
                },
                {
                    path: "/user/:id/likes",
                    element: <UserPageHome/>,
                    loader: UserLikedPostLoader,
                    handle: {title: "User Likes"}
                },
                {path: "/post/:id/edit", element: <EditPost/>, loader: PostDetailLoader, handle: {title: "Edit Post"}},
                {
                    path: "/user/:id/account",
                    element: <UserEdit/>,
                    loader: UserDetailLoader,
                    handle: {title: "Edit User Information"}
                }
            ],
        },
    ]);

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App

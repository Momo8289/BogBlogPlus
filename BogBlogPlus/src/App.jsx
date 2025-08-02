import {
    createBrowserRouter, RouterProvider
} from "react-router";
import './App.css'
import Home, {postsLoader}from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PostDetails, { postDetailLoader } from "./pages/PostDetail.jsx"; 
import Layout from "./components/Layout.jsx";



//make pages for main blog pages (all posts), blog post (singular), login, home, loading, error
// single user blog will be main blog page with just users posts
// create header/nav bar for top and footer bar for bottom of each page - included in layout
//add routing 
//study api call readme for how to get data


function App() {
    const router = createBrowserRouter([
        //handle will contain the value passed into the navbar for the title generation
        {path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Home />, loader: postsLoader, handle: {title:"Bog Blog"}},
          { path: "post/:id", element: <PostDetails />, loader: postDetailLoader, handle: {title:"Post Details"}},
          {path:"/login", element: <Login/>, handle: {title: "Login"}},
          {path:"/register", element: <Register/>, handle: {title: "Register"}}
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

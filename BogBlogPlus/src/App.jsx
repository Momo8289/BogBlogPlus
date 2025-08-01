import {
    createBrowserRouter, RouterProvider
} from "react-router";
import './App.css'
import Home, {postsLoader}from "./pages/Home.jsx";

//make pages for main blog pages (all posts), blog post (singular), login, home, loading, error
// single user blog will be main blog page with just users posts
// create header/nav bar for top and footer bar for bottom of each page - included in layout
//add routing 
//study api call readme for how to get data


function App() {
    const router = createBrowserRouter([

        {path: "/",
         element: <Home/>,
         loader: postsLoader
        }
    ])

        return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App

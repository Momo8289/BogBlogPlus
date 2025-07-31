import {
    createBrowserRouter, RouterProvider
} from "react-router";
import './App.css'
import Home from "./pages/Home.jsx";

function App() {
    const router = createBrowserRouter([
        {path: "/", element: <Home/>}
    ])

        return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App

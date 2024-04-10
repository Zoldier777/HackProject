import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './output.css'
import Navbar from './Navbar.tsx'
import Terms from './Terms.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "", element: <App/>, },
      { path: "search", element: <App/> },
    ],
},
{  
  path: "/",
  element: <Navbar />,
  children: [
    { path: "terms", element: <Terms/>}
  ]
}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

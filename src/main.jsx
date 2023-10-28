import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import MyRouter from './MyRouter/MyRouter.jsx'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './Provider/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider><AuthProvider><RouterProvider router={MyRouter}></RouterProvider></AuthProvider></HelmetProvider>
  </React.StrictMode>,
)

import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Routes} from './router/routes'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const router = createBrowserRouter(Routes)

const App: React.FC = () => {
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  )
}

export default App

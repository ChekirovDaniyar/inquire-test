import React from "react"
import PostsList from "../views/post/list"
import PostView from "../views/post/view"

export const Routes = [
  {
    path: '/',
    exact: true,
    element: <PostsList />
  },
  {
    path: '/posts/:id',
    exact: true,
    element: <PostView />
  },
]

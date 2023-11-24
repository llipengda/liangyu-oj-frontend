import React, { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const Problem = lazy(() => import('./pages/Problem'))
const Me = lazy(() => import('./pages/Me'))

const routes: RouteObject[] = [
  { path: 'home', element: <Home /> },
  { path: 'problem', element: <Problem /> },
  { path: 'me', element: <Me /> },
  { path: '/', element: <Navigate to='/home' /> }
]

export default routes

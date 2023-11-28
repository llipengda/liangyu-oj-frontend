import React, { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Home = lazy(() => import('@/pages/Home'))
const Problem = lazy(() => import('@/pages/Problem'))
const Me = lazy(() => import('@/pages/Me'))
const DetailProblem = lazy(() => import('@/pages/DetailProblem'))
const Error = lazy(() => import('@/pages/Error'))

const routes: RouteObject[] = [
  { path: 'home', element: <Home /> },
  {
    path: 'problem',
    element: <Problem />
  },
  { path: 'problem/:id', element: <DetailProblem /> },
  { path: 'error/:id', element: <Error /> },
  { path: 'error', element: <Navigate to='/error/404' /> },
  { path: 'me', element: <Me /> },
  { path: '/', element: <Navigate to='/home' /> }
]

export default routes

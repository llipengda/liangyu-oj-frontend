import React from 'react'
import { useParams } from 'react-router-dom'

export default function DetailProblem() {
  const { id } = useParams()
  console.log(id)

  return <div>DetailProblem</div>
}

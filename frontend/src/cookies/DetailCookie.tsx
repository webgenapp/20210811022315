import React from 'react'
import { useParams } from 'react-router-dom'
import client from '../api'
import { useQuery } from 'react-query'
import { Cookie } from '../types'

function DetailCookie() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<Cookie>(['cookies', id], () =>
    client.get(`/api/v1/cookies/${id}`).then((response) => response.data)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const cookie = data as Cookie

  return (
    <div>
      <label>{cookie.flavour}</label>
      <br />
    </div>
  )
}

export default DetailCookie

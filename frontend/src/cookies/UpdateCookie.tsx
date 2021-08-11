import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import CookieForm from './CookieForm'
import { Cookie } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdateCookie() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<Cookie>(['cookies', id], () =>
    client.get(`/api/v1/cookies/${id}`).then((response) => response.data)
  )

  const updateCookie = useMutation<Cookie, any, Cookie>(
    (values: Cookie) =>
      client
        .put(`/api/v1/cookies/${id}`, values)
        .then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cookies')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const cookie = data as Cookie
  return (
    <CookieForm
      cookie={cookie}
      onSubmit={(values, { setSubmitting }) => {
        updateCookie.mutate(values)
        setSubmitting?.(false)
        history.push('/cookies')
      }}
    />
  )
}

export default UpdateCookie

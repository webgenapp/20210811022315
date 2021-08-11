import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { Cookie } from '../types'
import { useHistory } from 'react-router-dom'

type CookiePreviewProps = {
  cookie: Cookie
  handleEdit: (cookie: Cookie) => void
  handleDelete: (cookie: Cookie) => void
  handleDetail: (cookie: Cookie) => void
}

function CookiePreview({
  cookie,
  handleEdit,
  handleDelete,
  handleDetail,
}: CookiePreviewProps) {
  return (
    <>
      {cookie.flavour}
      <br />
      <button type='button' onClick={() => handleDetail(cookie)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(cookie)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(cookie)}>
        delete
      </button>
    </>
  )
}

function ListCookies() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const cookiesQuery = useQuery<Cookie[]>('cookies', () => {
    return client
      .get('/api/v1/cookies')
      .then((response) => response.data) as Promise<Cookie[]>
  })

  const deleteCookie = useMutation<any, any, Partial<Cookie>>(
    ({ id }) => {
      return client.delete(`/api/v1/cookies/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cookies')
      },
    }
  )

  const handleEdit = ({ id }: Cookie) => {
    history.push(`/cookies/update/${id}`)
  }

  const handleDelete = ({ id }: Cookie) => {
    deleteCookie.mutate({ id })
  }

  const handleDetail = ({ id }: Cookie) => {
    history.push(`/cookies/detail/${id}`)
  }

  return (
    <>
      <p>{cookiesQuery.data?.length} cookies</p>
      <ul>
        {cookiesQuery.data?.map((cookie) => (
          <li key={cookie.id}>
            <CookiePreview
              cookie={cookie}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDetail={handleDetail}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListCookies

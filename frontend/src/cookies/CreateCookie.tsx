import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Cookie, CookieError } from '../types'
import CookieForm from './CookieForm'
import { useHistory } from 'react-router-dom'

function CreateCookie() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createCookie = useMutation<Cookie, CookieError, Cookie>(
    (values) => {
      return client.post('/api/v1/cookies', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cookies')
      },
    }
  )

  const handleSubmit = (
    values: Cookie,
    { setSubmitting }: FormikHelpers<Cookie>
  ) => {
    createCookie.mutate(values)
    setSubmitting?.(false)
    history.push('/cookies')
  }

  return <CookieForm onSubmit={handleSubmit} />
}

export default CreateCookie

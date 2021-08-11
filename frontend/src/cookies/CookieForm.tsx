import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { Cookie } from '../types'

type CreateProps = {
  cookie?: Cookie
  onSubmit: (values: Cookie, helpers: FormikHelpers<Cookie>) => void
}

function CookieForm({ cookie, onSubmit }: CreateProps) {
  const initialValues: Cookie = {
    flavour: cookie ? cookie.flavour : '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={() => {
        return {}
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type='text' name='flavour' placeholder='Flavour' />

          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default CookieForm

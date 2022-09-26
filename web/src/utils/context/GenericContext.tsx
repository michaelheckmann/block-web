import React from 'react'
import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo'
import { Toaster } from '@redwoodjs/web/toast'

function GenericContext(props) {
  return (
    <RedwoodApolloProvider>
      {props.children}
      <Toaster />
    </RedwoodApolloProvider>
  )
}

export default GenericContext

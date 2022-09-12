import React from 'react'
import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo'

function GenericContext(props) {
  return <RedwoodApolloProvider>{props.children}</RedwoodApolloProvider>
}

export default GenericContext

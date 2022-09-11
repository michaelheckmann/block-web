import React from 'react'
import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo'
import WorkoutCell from 'src/components/Workout/WorkoutCell'

function WorkoutCellContext() {
  return (
    <RedwoodApolloProvider>
      <WorkoutCell id={0} />
    </RedwoodApolloProvider>
  )
}

export default WorkoutCellContext

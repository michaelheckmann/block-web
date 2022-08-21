import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_WORKOUT_MUTATION = gql`
  mutation DeleteWorkoutMutation($id: Int!) {
    deleteWorkout(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Workout = ({ workout }) => {
  const [deleteWorkout] = useMutation(DELETE_WORKOUT_MUTATION, {
    onCompleted: () => {
      toast.success('Workout deleted')
      navigate(routes.workouts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete workout ' + id + '?')) {
      deleteWorkout({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Workout {workout.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{workout.id}</td>
            </tr><tr>
              <th>Name</th>
              <td>{workout.name}</td>
            </tr><tr>
              <th>Done</th>
              <td>{checkboxInputTag(workout.done)}</td>
            </tr><tr>
              <th>Template id</th>
              <td>{workout.templateId}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(workout.createdAt)}</td>
            </tr><tr>
              <th>Updated at</th>
              <td>{timeTag(workout.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editWorkout({ id: workout.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(workout.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Workout

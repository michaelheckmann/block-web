import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Workout/WorkoutsCell'

const DELETE_WORKOUT_MUTATION = gql`
  mutation DeleteWorkoutMutation($id: Int!) {
    deleteWorkout(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const WorkoutsList = ({ workouts }) => {
  const [deleteWorkout] = useMutation(DELETE_WORKOUT_MUTATION, {
    onCompleted: () => {
      toast.success('Workout deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete workout ' + id + '?')) {
      deleteWorkout({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Done</th>
            <th>Template id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout.id}>
              <td>{truncate(workout.id)}</td>
              <td>{truncate(workout.name)}</td>
              <td>{checkboxInputTag(workout.done)}</td>
              <td>{truncate(workout.templateId)}</td>
              <td>{timeTag(workout.createdAt)}</td>
              <td>{timeTag(workout.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  {/* <Link
                    to={routes.workout({ id: workout.id })}
                    title={'Show workout ' + workout.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link> */}
                  <Link
                    to={routes.workout({ id: workout.id })}
                    title={'Edit workout ' + workout.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete workout ' + workout.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(workout.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WorkoutsList

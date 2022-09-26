import { navigate, routes } from '@redwoodjs/router'
import WorkoutsCell from 'src/components/WorkoutsCell'
import { useWorkoutMutation } from 'src/utils/hooks/useWorkoutMutation'

const HomePage = () => {
  const workoutMutation = useWorkoutMutation({
    onCreationSuccess: ({ createWorkout }) => {
      console.log('WORKOUT CREATED', createWorkout)
      navigate(routes.workout({ id: createWorkout.id }))
    },
  })

  const newWorkout = () => {
    workoutMutation.createWorkout.mutation({
      variables: {
        input: {
          name: 'New Workout',
          done: false,
          templateId: 1,
        },
      },
    })
  }

  return (
    <div className="">
      <button onClick={newWorkout}>New Workout</button>
      <WorkoutsCell />
    </div>
  )
}

export default HomePage

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { useWorkoutMutation } from 'src/utils/hooks/useWorkoutMutation'

const HomePage = () => {
  const workoutMutation = useWorkoutMutation({
    onCreationSuccess: ({ createWorkout }) => {
      console.log('WORKOUT CREATED', createWorkout)
      navigate(routes.workout({ id: createWorkout.id }))
    },
  })

  const { currentUser, logOut } = useAuth()

  const newWorkout = () => {
    workoutMutation.createWorkout.mutation({
      variables: {
        input: {
          name: 'New Workout',
          done: false,
          templateId: 1,
          userId: currentUser.id,
        },
      },
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        className="px-2 py-1 text-gray-900 bg-gray-200 border-gray-300 border-1"
        onClick={logOut}
      >
        Logout
      </button>
      <button
        className="px-2 py-1 text-gray-900 bg-gray-200 border-gray-300 border-1"
        onClick={newWorkout}
      >
        New Workout
      </button>
      {/* <WorkoutsCell /> */}
    </div>
  )
}

export default HomePage

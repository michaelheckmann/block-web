import EditWorkoutCell from 'src/components/Workout/EditWorkoutCell'

type WorkoutPageProps = {
  id: number
}

const EditWorkoutPage = ({ id }: WorkoutPageProps) => {
  return <EditWorkoutCell id={id} />
}

export default EditWorkoutPage

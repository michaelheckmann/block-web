import WorkoutCell from 'src/components/Workout/WorkoutCell'

type WorkoutPageProps = {
  id: number
}

const WorkoutPage = ({ id }: WorkoutPageProps) => {
  return <WorkoutCell id={id} />
}

export default WorkoutPage

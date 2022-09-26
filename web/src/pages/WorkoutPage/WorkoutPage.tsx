import WorkoutCell from 'src/components/WorkoutCell'

type WorkoutPageProps = {
  id: number
}

const WorkoutPage = ({ id }: WorkoutPageProps) => {
  return (
    <div className="px-4">
      <WorkoutCell id={id} />
    </div>
  )
}

export default WorkoutPage

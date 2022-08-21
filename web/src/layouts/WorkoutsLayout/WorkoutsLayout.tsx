import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type WorkoutLayoutProps = {
  children: React.ReactNode
}

const WorkoutsLayout = ({ children }: WorkoutLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.workouts()}
            className="rw-link"
          >
            Workouts
          </Link>
        </h1>
        <Link
          to={routes.newWorkout()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Workout
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default WorkoutsLayout

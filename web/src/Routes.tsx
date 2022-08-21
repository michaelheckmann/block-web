// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import WorkoutsLayout from 'src/layouts/WorkoutsLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={WorkoutsLayout}>
        <Route path="/workouts/new" page={WorkoutNewWorkoutPage} name="newWorkout" />
        <Route path="/workouts/{id:Int}/edit" page={WorkoutEditWorkoutPage} name="editWorkout" />
        <Route path="/workouts/{id:Int}" page={WorkoutWorkoutPage} name="workout" />
        <Route path="/workouts" page={WorkoutWorkoutsPage} name="workouts" />
      </Set>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

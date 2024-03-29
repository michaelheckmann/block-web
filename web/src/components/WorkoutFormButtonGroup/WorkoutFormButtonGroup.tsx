import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'
import ExercisesCell from 'src/components/ExercisesCell'
import Modal from 'src/components/Modal'
import NewExercise from 'src/components/NewExercise'
import { defaultSet } from 'src/components/SetGroup'
import {
  remapLatestSetGroup,
  remapSet,
} from 'src/components/WorkoutCell/WorkoutCell'
import { ConfirmationToast } from 'src/utils/components/ConfirmationToast'
import { useSetGroupMutation } from 'src/utils/hooks/useSetGroupMutation'
import { useSetMutation } from 'src/utils/hooks/useSetMutation'
import { useWorkoutMutation } from 'src/utils/hooks/useWorkoutMutation'
import { WorkoutFormType } from 'src/utils/types/WorkoutFormType'

/* Types */
type Props = {
  getValues: any
  append: any
  update: any
  fields: any
  workout: WorkoutFormType
  disabled: boolean
}

/* Component */
export function WorkoutFormButtonGroup({
  getValues,
  append,
  update,
  fields,
  workout,
  disabled,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<'new' | 'select'>('select')

  /* Mutations */
  // Set
  const setMutation = useSetMutation({
    // Triggered after the createSetGroupMutation is done
    // Add the new set to the setGroup that was just created
    onCreationSuccess: ({ createSet }) => {
      console.log('SET CREATED')
      // Get the index of the setGroup that was just created
      const setGroupIndex = getValues().setGroups.findIndex(
        (field) => field.setGroupId === createSet.setGroupId
      )
      // Update the setGroup add the new set to the list of sets
      update(setGroupIndex, {
        ...getValues().setGroups[setGroupIndex],
        sets: [remapSet(createSet)],
      })
    },
  })

  // Set Group
  const setGroupMutation = useSetGroupMutation({
    onCreationSuccess: ({ createSetGroup }) => {
      console.log('SET GROUP CREATED')
      setMutation.createSet.mutation({
        variables: {
          input: {
            ...defaultSet,
            setGroupId: createSetGroup.id,
          },
        },
      })
      append({
        setGroupId: createSetGroup.id,
        order: createSetGroup.order,
        exercise: {
          exerciseId: createSetGroup.exercise.id,
          name: createSetGroup.exercise.name,
          latestSetGroup: remapLatestSetGroup(
            createSetGroup.exercise.latestSetGroup
          ),
        },
        sets: [],
      })
    },
    onUpdateSuccess: ({ updateSetGroup }) => {
      const { order } = updateSetGroup
      // console.log(`SET GROUP ${order} UPDATED`)
      update(order, {
        ...getValues().setGroups[order],
        order,
      })
    },
  })

  // Workout
  const workoutMutation = useWorkoutMutation({
    onSaveSuccess: ({ saveWorkout }) => {
      console.log(`WORKOUT SAVED`, saveWorkout)
      //TODO: Show a success modal
    },
  })

  const handleFinishWorkout = () => {
    const finishWorkoutId = 'handleFinishWorkout'
    const hasOpenSets = getValues().setGroups.some((setGroup) => {
      return setGroup.sets.some((set) => !set.done)
    })

    if (hasOpenSets) {
      toast(
        (t) => (
          <ConfirmationToast
            t={t}
            actionEvent={() => finishWorkout()}
            actionEventLabel="Finish"
            text="Not all sets are completed. Do you want to continue?"
          />
        ),
        {
          id: finishWorkoutId,
          position: 'bottom-center',
          duration: 10000,
          icon: <></>,
        }
      )
    } else {
      finishWorkout()
    }
  }

  const finishWorkout = () => {
    toast.dismiss('handleFinishWorkout')
    console.log('FINISH WORKOUT')

    // Save the workout
    workoutMutation.saveWorkout.mutation({
      variables: {
        id: workout.workoutId,
      },
    })
  }

  /* Functions */
  const selectExercise = (id: number) => {
    setGroupMutation.createSetGroup.mutation({
      variables: {
        input: {
          exerciseId: id,
          order: fields.length,
          workoutId: workout.workoutId,
        },
      },
    })
    setIsModalOpen(false)
  }

  const handleNewExercise = (id: number) => {
    selectExercise(id)
    setModalContent('select')
  }

  /* Render */
  return (
    <div className="flex flex-col gap-6 mt-8 mb-8">
      <button
        type="button"
        className="w-full h-10 p-1 font-medium tracking-wide text-gray-900 transition-colors bg-gray-200 rounded-sm text-md hover:bg-gray-300 active:bg-gray-300"
        onClick={() => setIsModalOpen(true)}
      >
        + Add Exercise
      </button>
      <button
        type="button"
        className="w-full h-10 p-1 font-medium tracking-wide text-white transition-colors bg-gray-800 rounded-sm text-md hover:bg-gray-900 active:bg-gray-900 disabled:bg-gray-200 disabled:text-gray-500"
        onClick={handleFinishWorkout}
        disabled={disabled}
      >
        Finish Workout
      </button>

      {/* Modal for the exercise details */}
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <>
          {/* Select existing exercise */}
          {modalContent === 'select' && (
            <ExercisesCell
              close={() => setIsModalOpen(false)}
              selectExercise={selectExercise}
              createExercise={() => setModalContent('new')}
            />
          )}

          {/* Create a new exercise */}
          {modalContent === 'new' && (
            <NewExercise handleNewExercise={handleNewExercise} />
          )}
        </>
      </Modal>
    </div>
  )
}

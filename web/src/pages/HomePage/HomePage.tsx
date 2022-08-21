import { FormProvider, useFieldArray, useForm } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import SetGroup, { SetGroupType } from 'src/components/SetGroup/SetGroup'

export type FormType = {
  setGroups: SetGroupType[]
}

const HomePage = () => {
  const methods = useForm<FormType>({
    defaultValues: {
      setGroups: [
        {
          exercise: 'Squat',
          sets: [
            {
              previous: { weight: 10, reps: 12 },
              weight: 6,
              reps: 15,
              done: false,
            },
          ],
        },
      ],
    },
  })
  const { control, handleSubmit } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'setGroups',
  })

  const onSubmit = handleSubmit((values) => {
    console.log(values)
  })

  const defaultSetGroup: SetGroupType = {
    exercise: 'New',
    sets: [
      {
        previous: { weight: undefined, reps: undefined },
        weight: undefined,
        reps: undefined,
        done: false,
      },
    ],
  }

  return (
    <>
      {/* <MetaTags title="Home" description="Home page" /> */}

      <h1>HomePage</h1>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <section className="flex flex-col gap-3">
            {fields.map((item, setGroupIndex) => (
              <div key={item.id} className="flex flex-col">
                <SetGroup {...item} setGroupIndex={setGroupIndex} />
                <button
                  className="p-1 font-semibold bg-red-300 rounded"
                  onClick={() => remove(setGroupIndex)}
                >
                  Delete
                </button>
              </div>
            ))}

            <button
              className="p-2 font-semibold bg-green-300 rounded"
              onClick={() => append(defaultSetGroup)}
            >
              Add
            </button>
          </section>
          <button className="p-2 mt-5 font-semibold bg-gray-300 rounded">
            Submit
          </button>
        </form>
      </FormProvider>
    </>
  )
}

export default HomePage

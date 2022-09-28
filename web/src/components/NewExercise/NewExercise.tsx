import { useAuth } from '@redwoodjs/auth'
import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { useEffect, useRef } from 'react'
import { CreateExerciseMutation } from '../../../types/graphql'

const CREATE_EXERCISE = gql`
  mutation CreateExerciseMutation($input: CreateExerciseInput!) {
    createExercise(input: $input) {
      id
    }
  }
`

type Props = {
  handleNewExercise: (id: number) => void
}

const NewExercise = ({ handleNewExercise }: Props) => {
  // focus on name input on page load
  const nameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const { currentUser } = useAuth()
  const [createExerciseMutation, { loading }] = useMutation(CREATE_EXERCISE, {
    onCompleted: ({ createExercise }: CreateExerciseMutation) => {
      handleNewExercise(createExercise.id)
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    createExerciseMutation({
      variables: { input: { name: data.name, userId: currentUser.id } },
    })
  }

  return (
    <Form onSubmit={onSubmit}>
      <Label
        name="name"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Name
      </Label>
      <TextField
        name="name"
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        ref={nameRef}
        validation={{
          required: {
            value: true,
            message: 'Name is required',
          },
        }}
      />
      <FieldError name="name" className="rw-field-error" />
      <Submit disabled={loading} className="rw-button rw-button-blue">
        Add Exercise
      </Submit>
    </Form>
  )
}

export default NewExercise

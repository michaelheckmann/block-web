import {
  ApolloCache,
  ApolloError,
  DefaultContext,
  MutationFunctionOptions,
  OnQueryUpdated,
} from '@apollo/client'
import { useMutation } from '@redwoodjs/web'
import {
  CreateWorkoutInput,
  CreateWorkoutMutation,
  CreateWorkoutMutationVariables,
  DeleteWorkoutMutation,
  DeleteWorkoutMutationVariables,
  Exact,
  SaveWorkoutMutation,
  SaveWorkoutMutationVariables,
  UpdateWorkoutInput,
  UpdateWorkoutMutation,
  UpdateWorkoutMutationVariables,
} from '../../../types/graphql'

const CREATE_WORKOUT_MUTATION = gql`
  mutation CreateWorkoutMutation($input: CreateWorkoutInput!) {
    createWorkout(input: $input) {
      id
      name
      done
      templateId
    }
  }
`

const UPDATE_WORKOUT_MUTATION = gql`
  mutation UpdateWorkoutMutation($id: Int!, $input: UpdateWorkoutInput!) {
    updateWorkout(id: $id, input: $input) {
      id
      name
      done
      templateId
      createdAt
      updatedAt
    }
  }
`

const SAVE_WORKOUT_MUTATION = gql`
  mutation SaveWorkoutMutation($id: Int!) {
    saveWorkout(id: $id) {
      id
    }
  }
`

const DELETE_WORKOUT_MUTATION = gql`
  mutation DeleteWorkoutMutation($id: Int!) {
    deleteWorkout(id: $id) {
      id
    }
  }
`

type useWorkoutMutationArgs = {
  onCreationSuccess?: (data: CreateWorkoutMutation) => any
  onUpdateSuccess?: (data: UpdateWorkoutMutation) => any
  onSaveSuccess?: (data: SaveWorkoutMutation) => any
  onDeleteSuccess?: (data: DeleteWorkoutMutation) => any
  onUpdateQueryUpdated?: OnQueryUpdated<any>
  onError?: (error: ApolloError) => any
}

type useWorkoutMutationReturn = {
  createWorkout: {
    mutation: (
      options?: MutationFunctionOptions<
        CreateWorkoutMutation,
        Exact<{
          input: CreateWorkoutInput
        }>,
        DefaultContext,
        ApolloCache<any>
      >
    ) => Promise<any>
    loading: boolean
    error: ApolloError | undefined
    data: CreateWorkoutMutation | undefined
  }
  updateWorkout: {
    mutation: (
      options?: MutationFunctionOptions<
        UpdateWorkoutMutation,
        Exact<{
          id: number
          input: UpdateWorkoutInput
        }>,
        DefaultContext,
        ApolloCache<any>
      >
    ) => Promise<any>
    loading: boolean
    error: ApolloError | undefined
    data: UpdateWorkoutMutation | undefined
  }
  saveWorkout: {
    mutation: (
      options?: MutationFunctionOptions<
        SaveWorkoutMutation,
        Exact<{
          id: number
        }>,
        DefaultContext,
        ApolloCache<any>
      >
    ) => Promise<any>
    loading: boolean
    error: ApolloError | undefined
    data: SaveWorkoutMutation | undefined
  }
  deleteWorkout: {
    mutation: (
      options?: MutationFunctionOptions<
        DeleteWorkoutMutation,
        Exact<{
          id: number
        }>,
        DefaultContext,
        ApolloCache<any>
      >
    ) => Promise<any>
    loading: boolean
    error: ApolloError | undefined
    data: DeleteWorkoutMutation | undefined
  }
  loading: boolean
}

// Default behavior for onQueryUpdated:
// Cell fetch query is called whenever something is updated
// This causes the entire form to re-render
// If we return false, the cell fetch query is not called

export function useWorkoutMutation({
  onCreationSuccess = (d) => console.log(d),
  onUpdateSuccess = (d) => console.log(d),
  onSaveSuccess = (d) => console.log(d),
  onDeleteSuccess = (d) => console.log(d),
  onUpdateQueryUpdated = (d) => false,
  onError = (e) => console.error(e.message),
}: useWorkoutMutationArgs = {}): useWorkoutMutationReturn {
  const [
    createWorkoutMutation,
    {
      loading: createWorkoutMutationLoading,
      error: createWorkoutMutationError,
      data: createWorkoutMutationData,
    },
  ] = useMutation<CreateWorkoutMutation, CreateWorkoutMutationVariables>(
    CREATE_WORKOUT_MUTATION,
    {
      onCompleted: onCreationSuccess,
      onError,
    }
  )

  const [
    updateWorkoutMutation,
    {
      loading: updateWorkoutMutationLoading,
      error: updateWorkoutMutationError,
      data: updateWorkoutMutationData,
    },
  ] = useMutation<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>(
    UPDATE_WORKOUT_MUTATION,
    {
      onCompleted: onUpdateSuccess,
      onError,
      onQueryUpdated: onUpdateQueryUpdated,
    }
  )

  const [
    saveWorkoutMutation,
    {
      loading: saveWorkoutMutationLoading,
      error: saveWorkoutMutationError,
      data: saveWorkoutMutationData,
    },
  ] = useMutation<SaveWorkoutMutation, SaveWorkoutMutationVariables>(
    SAVE_WORKOUT_MUTATION,
    {
      onCompleted: onSaveSuccess,
      onError,
      onQueryUpdated: onUpdateQueryUpdated,
    }
  )

  const [
    deleteWorkoutMutation,
    {
      loading: deleteWorkoutMutationLoading,
      error: deleteWorkoutMutationError,
      data: deleteWorkoutMutationData,
    },
  ] = useMutation<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>(
    DELETE_WORKOUT_MUTATION,
    {
      onCompleted: onDeleteSuccess,
      onError,
    }
  )

  return {
    createWorkout: {
      mutation: createWorkoutMutation,
      data: createWorkoutMutationData,
      loading: createWorkoutMutationLoading,
      error: createWorkoutMutationError,
    },
    updateWorkout: {
      mutation: updateWorkoutMutation,
      data: updateWorkoutMutationData,
      loading: updateWorkoutMutationLoading,
      error: updateWorkoutMutationError,
    },
    saveWorkout: {
      mutation: saveWorkoutMutation,
      data: saveWorkoutMutationData,
      loading: saveWorkoutMutationLoading,
      error: saveWorkoutMutationError,
    },
    deleteWorkout: {
      mutation: deleteWorkoutMutation,
      data: deleteWorkoutMutationData,
      loading: deleteWorkoutMutationLoading,
      error: deleteWorkoutMutationError,
    },
    loading:
      createWorkoutMutationLoading ||
      updateWorkoutMutationLoading ||
      deleteWorkoutMutationLoading,
  }
}

import {
  CreateSetInput,
  CreateSetMutationVariables,
  DeleteSetMutation,
  DeleteSetMutationVariables,
  Exact,
  UpdateSetInput,
} from '../../../types/graphql'
import { useMutation } from '@redwoodjs/web'
import {
  CreateSetMutation,
  UpdateSetMutation,
  UpdateSetMutationVariables,
} from 'types/graphql'
import {
  ApolloError,
  DefaultContext,
  ApolloCache,
  MutationFunctionOptions,
  OnQueryUpdated,
} from '@apollo/client'

const CREATE_SET_MUTATION = gql`
  mutation CreateSetMutation($input: CreateSetInput!) {
    createSet(input: $input) {
      id
      weight
      reps
      done
      setGroupId
    }
  }
`

const UPDATE_SET_MUTATION = gql`
  mutation UpdateSetMutation($id: Int!, $input: UpdateSetInput!) {
    updateSet(id: $id, input: $input) {
      id
      weight
      reps
      done
      createdAt
      updatedAt
    }
  }
`

const DELETE_SET_MUTATION = gql`
  mutation DeleteSetMutation($id: Int!) {
    deleteSet(id: $id) {
      id
    }
  }
`

type useSetMutationArgs = {
  onCreationSuccess?: (data: CreateSetMutation) => any
  onUpdateSuccess?: (data: UpdateSetMutation) => any
  onDeleteSuccess?: (data: DeleteSetMutation) => any
  onUpdateQueryUpdated?: OnQueryUpdated<any>
  onError?: (error: ApolloError) => any
}

type useSetMutationReturn = {
  createSet: {
    mutation: (
      options?: MutationFunctionOptions<
        CreateSetMutation,
        Exact<{
          input: CreateSetInput
        }>,
        DefaultContext,
        ApolloCache<any>
      >
    ) => Promise<any>
    loading: boolean
    error: ApolloError | undefined
    data: CreateSetMutation | undefined
  }
  updateSet: {
    mutation: (
      options?: MutationFunctionOptions<
        UpdateSetMutation,
        Exact<{
          id: number
          input: UpdateSetInput
        }>,
        DefaultContext,
        ApolloCache<any>
      >
    ) => Promise<any>
    loading: boolean
    error: ApolloError | undefined
    data: UpdateSetMutation | undefined
  }
  deleteSet: {
    mutation: (
      options?: MutationFunctionOptions<
        DeleteSetMutation,
        Exact<{
          id: number
        }>,
        DefaultContext,
        ApolloCache<any>
      >
    ) => Promise<any>
    loading: boolean
    error: ApolloError | undefined
    data: DeleteSetMutation | undefined
  }
  loading: boolean
}

// Default behavior for onQueryUpdated:
// Cell fetch query is called whenever something is updated
// This causes the entire form to re-render
// If we return false, the cell fetch query is not called

export function useSetMutation({
  onCreationSuccess = (d) => console.log(d),
  onUpdateSuccess = (d) => console.log(d),
  onDeleteSuccess = (d) => console.log(d),
  onUpdateQueryUpdated = (d) => false,
  onError = (e) => console.error(e.message),
}: useSetMutationArgs = {}): useSetMutationReturn {
  const [
    createSetMutation,
    {
      loading: createSetMutationLoading,
      error: createSetMutationError,
      data: createSetMutationData,
    },
  ] = useMutation<CreateSetMutation, CreateSetMutationVariables>(
    CREATE_SET_MUTATION,
    {
      onCompleted: onCreationSuccess,
      onError,
    }
  )

  const [
    updateSetMutation,
    {
      loading: updateSetMutationLoading,
      error: updateSetMutationError,
      data: updateSetMutationData,
    },
  ] = useMutation<UpdateSetMutation, UpdateSetMutationVariables>(
    UPDATE_SET_MUTATION,
    {
      onCompleted: onUpdateSuccess,
      onError,
      onQueryUpdated: onUpdateQueryUpdated,
    }
  )

  const [
    deleteSetMutation,
    {
      loading: deleteSetMutationLoading,
      error: deleteSetMutationError,
      data: deleteSetMutationData,
    },
  ] = useMutation<DeleteSetMutation, DeleteSetMutationVariables>(
    DELETE_SET_MUTATION,
    {
      onCompleted: onDeleteSuccess,
      onError,
    }
  )

  return {
    createSet: {
      mutation: createSetMutation,
      data: createSetMutationData,
      loading: createSetMutationLoading,
      error: createSetMutationError,
    },
    updateSet: {
      mutation: updateSetMutation,
      data: updateSetMutationData,
      loading: updateSetMutationLoading,
      error: updateSetMutationError,
    },
    deleteSet: {
      mutation: deleteSetMutation,
      data: deleteSetMutationData,
      loading: deleteSetMutationLoading,
      error: deleteSetMutationError,
    },
    loading:
      createSetMutationLoading ||
      updateSetMutationLoading ||
      deleteSetMutationLoading,
  }
}

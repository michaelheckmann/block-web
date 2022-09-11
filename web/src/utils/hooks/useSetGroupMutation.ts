import {
  CreateSetGroupInput,
  CreateSetGroupMutation,
  CreateSetGroupMutationVariables,
  DeleteSetGroupMutation,
  DeleteSetGroupMutationVariables,
  UpdateSetGroupInput,
  UpdateSetGroupMutation,
  UpdateSetGroupMutationVariables,
  Exact,
} from '../../../types/graphql'
import { useMutation } from '@redwoodjs/web'
import {
  ApolloError,
  DefaultContext,
  ApolloCache,
  MutationFunctionOptions,
} from '@apollo/client'

const CREATE_SET_GROUP_MUTATION = gql`
  mutation CreateSetGroupMutation($input: CreateSetGroupInput!) {
    createSetGroup(input: $input) {
      id
      exercise {
        id
        name
        latestSetGroup {
          sets {
            weight
            reps
          }
        }
      }
    }
  }
`

const UPDATE_SET_GROUP_MUTATION = gql`
  mutation UpdateSetGroupMutation($id: Int!, $input: UpdateSetGroupInput!) {
    updateSetGroup(id: $id, input: $input) {
      id
      createdAt
      updatedAt
    }
  }
`

const DELETE_SET_GROUP_MUTATION = gql`
  mutation DeleteSetGroupMutation($id: Int!) {
    deleteSetGroup(id: $id) {
      id
    }
  }
`

type useSetGroupMutationArgs = {
  onCreationSuccess?: (data: CreateSetGroupMutation) => any
  onUpdateSuccess?: (data: UpdateSetGroupMutation) => any
  onDeleteSuccess?: (data: DeleteSetGroupMutation) => any
  onError?: (error: ApolloError) => any
}

type useSetGroupMutationReturn = {
  createSetGroup: {
    mutation: (
      options?: MutationFunctionOptions<
        CreateSetGroupMutation,
        Exact<{
          input: CreateSetGroupInput
        }>,
        DefaultContext,
        ApolloCache<any>
      >
    ) => Promise<any>
    loading: boolean
    error: ApolloError | undefined
    data: CreateSetGroupMutation | undefined
  }
  updateSetGroup: {
    mutation: (
      options?: MutationFunctionOptions<
        UpdateSetGroupMutation,
        Exact<{
          id: number
          input: UpdateSetGroupInput
        }>,
        DefaultContext,
        ApolloCache<any>
      >
    ) => Promise<any>
    loading: boolean
    error: ApolloError | undefined
    data: UpdateSetGroupMutation | undefined
  }
  deleteSetGroup: {
    mutation: (
      options?: MutationFunctionOptions<
        DeleteSetGroupMutation,
        Exact<{
          id: number
        }>,
        DefaultContext,
        ApolloCache<any>
      >
    ) => Promise<any>
    loading: boolean
    error: ApolloError | undefined
    data: DeleteSetGroupMutation | undefined
  }
  loading: boolean
}

export function useSetGroupMutation({
  onCreationSuccess = (d) => console.log(d),
  onUpdateSuccess = (d) => console.log(d),
  onDeleteSuccess = (d) => console.log(d),
  onError = (e) => console.error(e.message),
}: useSetGroupMutationArgs = {}): useSetGroupMutationReturn {
  const [
    createSetGroupMutation,
    {
      loading: createSetGroupMutationLoading,
      error: createSetGroupMutationError,
      data: createSetGroupMutationData,
    },
  ] = useMutation<CreateSetGroupMutation, CreateSetGroupMutationVariables>(
    CREATE_SET_GROUP_MUTATION,
    {
      onCompleted: onCreationSuccess,
      onError,
    }
  )

  const [
    updateSetGroupMutation,
    {
      loading: updateSetGroupMutationLoading,
      error: updateSetGroupMutationError,
      data: updateSetGroupMutationData,
    },
  ] = useMutation<UpdateSetGroupMutation, UpdateSetGroupMutationVariables>(
    UPDATE_SET_GROUP_MUTATION,
    {
      onCompleted: onUpdateSuccess,
      onError,
    }
  )

  const [
    deleteSetGroupMutation,
    {
      loading: deleteSetGroupMutationLoading,
      error: deleteSetGroupMutationError,
      data: deleteSetGroupMutationData,
    },
  ] = useMutation<DeleteSetGroupMutation, DeleteSetGroupMutationVariables>(
    DELETE_SET_GROUP_MUTATION,
    {
      onCompleted: onDeleteSuccess,
      onError,
    }
  )

  return {
    createSetGroup: {
      mutation: createSetGroupMutation,
      data: createSetGroupMutationData,
      loading: createSetGroupMutationLoading,
      error: createSetGroupMutationError,
    },
    updateSetGroup: {
      mutation: updateSetGroupMutation,
      data: updateSetGroupMutationData,
      loading: updateSetGroupMutationLoading,
      error: updateSetGroupMutationError,
    },
    deleteSetGroup: {
      mutation: deleteSetGroupMutation,
      data: deleteSetGroupMutationData,
      loading: deleteSetGroupMutationLoading,
      error: deleteSetGroupMutationError,
    },
    loading:
      createSetGroupMutationLoading ||
      updateSetGroupMutationLoading ||
      deleteSetGroupMutationLoading,
  }
}

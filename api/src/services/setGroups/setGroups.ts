import { exercise } from './../exercises/exercises'
import type {
  QueryResolvers,
  MutationResolvers,
  SetGroupResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const setGroups: QueryResolvers['setGroups'] = () => {
  return db.setGroup.findMany()
}

export const setGroup: QueryResolvers['setGroup'] = ({ id }) => {
  return db.setGroup.findUnique({
    where: { id },
  })
}

export const createSetGroup: MutationResolvers['createSetGroup'] = ({
  input,
}) => {
  return db.setGroup.create({
    data: input,
  })
}

export const updateSetGroup: MutationResolvers['updateSetGroup'] = ({
  id,
  input,
}) => {
  return db.setGroup.update({
    data: input,
    where: { id },
  })
}

export const deleteSetGroup: MutationResolvers['deleteSetGroup'] = ({ id }) => {
  return db.setGroup.delete({
    where: { id },
  })
}

export const SetGroup: SetGroupResolvers = {
  sets: (_obj, { root }) =>
    db.setGroup.findUnique({ where: { id: root.id } }).sets(),
  exercise: (_obj, { root }) =>
    db.setGroup.findUnique({ where: { id: root.id } }).exercise(),
  workout: (_obj, { root }) =>
    db.setGroup.findUnique({ where: { id: root.id } }).workout(),
}

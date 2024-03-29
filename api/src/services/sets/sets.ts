import type {
  QueryResolvers,
  MutationResolvers,
  SetResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const sets: QueryResolvers['sets'] = () => {
  return db.set.findMany()
}

export const set: QueryResolvers['set'] = ({ id }) => {
  return db.set.findUnique({
    where: { id },
  })
}

export const createSet: MutationResolvers['createSet'] = ({ input }) => {
  return db.set.create({
    data: input,
  })
}

export const updateSet: MutationResolvers['updateSet'] = ({ id, input }) => {
  return db.set.update({
    data: input,
    where: { id },
  })
}

export const deleteSet: MutationResolvers['deleteSet'] = ({ id }) => {
  return db.set.delete({
    where: { id },
  })
}

export const Set: SetResolvers = {
  setGroup: (_obj, { root }) =>
    db.set.findUnique({ where: { id: root.id } }).setGroup(),
}

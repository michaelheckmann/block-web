import type {
  MutationResolvers,
  QueryResolvers,
  TemplateResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const templates: QueryResolvers['templates'] = () => {
  return db.template.findMany()
}

export const templatesByUserId: QueryResolvers['templatesByUserId'] = ({
  id,
}) => {
  return db.template.findMany({
    where: {
      userId: id,
    },
  })
}

export const template: QueryResolvers['template'] = ({ id }) => {
  return db.template.findUnique({
    where: { id },
  })
}

export const createTemplate: MutationResolvers['createTemplate'] = ({
  input,
}) => {
  return db.template.create({
    data: input,
  })
}

export const updateTemplate: MutationResolvers['updateTemplate'] = ({
  id,
  input,
}) => {
  return db.template.update({
    data: input,
    where: { id },
  })
}

export const deleteTemplate: MutationResolvers['deleteTemplate'] = ({ id }) => {
  return db.template.delete({
    where: { id },
  })
}

export const Template: TemplateResolvers = {
  workouts: (_obj, { root }) =>
    db.template.findUnique({ where: { id: root.id } }).workouts(),
}

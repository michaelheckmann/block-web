/* Functions */
/**
 * It checks if the order of the set groups in the database is the same as the order of the set groups
 * in the state. If it's not, it updates the order of the set groups in the database
 */

export const validateSetGroupOrder = (values, setGroupMutation) => {
  values.setGroups.forEach((setGroup, index) => {
    if (setGroup.order !== index) {
      setGroupMutation.updateSetGroup.mutation({
        variables: {
          id: setGroup.setGroupId,
          input: {
            order: index,
          },
        },
      })
    }
  })
}

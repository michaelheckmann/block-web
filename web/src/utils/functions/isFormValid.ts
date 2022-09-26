export function isFormValid(trigger, formState) {
  trigger()
  return Object.keys(formState.errors).length === 0
}

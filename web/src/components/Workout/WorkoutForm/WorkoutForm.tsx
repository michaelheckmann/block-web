import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'



const WorkoutForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.workout?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        
          <TextField
            name="name"
            defaultValue={props.workout?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="done"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Done
        </Label>
        
          <CheckboxField
            name="done"
            defaultChecked={props.workout?.done}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="done" className="rw-field-error" />

        <Label
          name="templateId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Template id
        </Label>
        
          <NumberField
            name="templateId"
            defaultValue={props.workout?.templateId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="templateId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default WorkoutForm

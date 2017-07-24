// React model

var model = 
{
  form: {
    formSection: [
      {TextArea: 'new Text Area'}, // new TextArea - instance of a TextArea class
      {TextArea: 'new Text Area'},
      {TextInput: 'new Text Input'}
    ]
  }
}

/*
  - assume that all entities added to the app are children of FormSection
  - assume the presentation of each of the form entities is completely unaware of state or redux
  - the FormSection instance will have only {model: FormSection} as it props
  - the children TextInput components will inherit model from parents ex. {model: model[0]}
  - there will be a container component for form
*/
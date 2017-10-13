[{
  "type": "FormSection", "uuid": 1, "width": 2, "prepend": 3, "append": 4,
  "children": [
    { "_type": "TextArea", "_uuid": null, "_width": 2, "_prepend": 88, "_append": 4, "_prePrompt": "prePromptString", "_prePromptWidth": 6, "_postPrompt": "postPromptString", "_postPromptWidth": 6, "_name": "name", "_sasCodeLabel": "sasCodeLabel", "_tabOrder": [1, 2, 3], "_inputWidth": 7, "_promptNumber": "promptNumber", "_autoNumber": 0, "_numColumns": 100, "_numRows": 2 },
    { "_type": "TextInput", "_uuid": null, "_width": 2, "_prepend": 4, "_append": 4, "_prePrompt": "prePromptString", "_prePromptWidth": 6, "_postPrompt": "postPromptString", "_postPromptWidth": 6, "_name": "text input name", "_sasCodeLabel": "sasCodeLabel", "_tabOrder": [1, 2, 3], "_inputWidth": 7, "_promptNumber": "promptNumber", "_autoNumber": 0, "_length": 60, "_defaultContent": "Default Content", "_autoTab": true, "_doubleEntry": true }]
  , "legend": "string"
},
{ "uuid": null, "width": 2, "prepend": 88, "append": 4, "prePrompt": "prePromptString", "prePromptWidth": 6, "postPrompt": 6, "postPromptWidth": 6, "name": "name", "sasCodeLabel": "sasCodeLabel", "type": "TextArea", "tabOrder": [1, 2, 3], "inputWidth": 7, "promptNumber": "promptNumber", "autoNumber": 0, "numColumns": 100, "numRows": 2 },
{ "uuid": null, "width": 2, "prepend": 4, "append": 4, "prePrompt": "prePromptString", "prePromptWidth": 6, "postPrompt": 6, "postPromptWidth": 6, "name": "text input name", "sasCodeLabel": "sasCodeLabel", "type": "TextInput", "tabOrder": [1, 2, 3], "inputWidth": 7, "promptNumber": "promptNumber", "autoNumber": 0, "length": 60, "defaultContent": "Default Content", "autoTab": true, "doubleEntry": true }]


'the data structure looks something like this:'
state = {
  form: {
    type: 'Form',
    children: [
      {
        FormSection: [
          {
            type: 'FormSection',
            children: [
              {
                type: 'TextInput'
              }
            ]
          }
        ]
      }
    ]
  }
}
```
state.form.children().map((formSection) => {
      console.log('formSection ', formSection.properties())
      return (formSection.properties()).children.map((formEntity) => { 
        return formEntity.properties()
      })
    })
```
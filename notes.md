- create a TextInput
1. dispatch an action to create a TextInput({uuid: 1, width: 2, etc.})
2. action passes the properties into the API - 
new TextInput({uuid: 1, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'type', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber',  prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true})
3. returns a new TextInput
4. Update store - add text input to store
5. Updated store triggers a re-render with new TextInput

Links: 
https://github.com/krasimir/react-in-patterns/tree/master/patterns/presentational-and-container

http://redux.js.org/docs/recipes/reducers/RefactoringReducersExample.html#extracting-utility-functions

https://github.com/blackstc/intro-react-redux-omdb

lessons-learned: 
1. When introducing redux-middleware, the actions appear to need to be a function

window-shopping react
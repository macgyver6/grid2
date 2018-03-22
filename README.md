## Form Designer

_Description_: Web application allowing forms to be build via GUI for data collection. Extensive drag and drop implemntation that is designed to work in Firefox, Chrome and Edge.

_Technologies utilized_:

* react
* redux
* ES6 can be written as this application is run through babel
* unit testing implemented with testing library mocha and assertion library chai

_Design principles implemented_:

* immutability

## Start here

1.  `npm i`: install all npm dependencies
2.  `npm start`: Start the development server
3.  point browser to `localhost:3000`

## Form Validation

Form validation has 2 different use cases:

1.  Form Import Validation: When importing legacy forms, they can be ran against this import validation method to detirmine if the form is valid. If it is not, an array of all exceptions will be return. Ex:

```
[
  {exception: {'entities must have a positive width'}, entity: {type: TextInput, width: -1, uuid: 1a}}
  ]
```

## Unit Testing

`npm test`: Run `mocha` and `chai` tests against the form validations suite. Stubbed out for CI integration.

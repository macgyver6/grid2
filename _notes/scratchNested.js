
form = 
[ // FormSection 1
  [ // children
    {
      type: 'Blue'
    },
    {
      type: 'Green'
    },
    {
      type: 'Purple'
    }
  ],
  [
    
      {
        type: 'Mclaren'
      },
      {
        type: 'Ferrari'
      }
    
  ],
  [
    
      {
        type: 'Schwinn'
      }
    
  ]
]


function add(entity, path, index) {
  if (path.length <= 0) {

    return 'complete'
  } else {
    // console.log(Object.key(state))
    console.log(path)
    let sliced = path.splice(0, 1)
    return add(entity, sliced, state[sliced[0]])
  }
  /*
    1. loop through the path
    2. remove the [0] path arr.splice(0, 1)
    3. call itself
  */
}

console.log(add('TextInput', [0, 1, 0]))

// module.exports = { state: state }




let form =
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

// called with every property and its value
function process(key, value) {
    console.log(key + " : " + value);
}

/*
    Traverse
    1. loop through the path
    2. for every path[i], push the form into the acc[i]
    3. return 
*/

function action(entity, path) {
    return add(entity, form, path)
}

function add(entity, dest, path) {
    // console.log('evaluate ', dest)
    if (path.length === 1) {
        // console.log('loop finished running ', dest[path[0]].type)
        return dest[path[0].type]
    } else {
        path.splice(0, 1)
        // console.log('next ', dest[path[0]])
        add(entity, dest[path[0]], path)
    }

}
let entity = 'TextInput'
let path = [0, 0]

console.log(action(entity, path, add));

// console.log(state)
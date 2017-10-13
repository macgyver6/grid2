const form = {
  type: 'Form',
  children: [
    {
      type: 'FormSection',
      children: [
        {
          type: 'FormSection',
          children: [
            {
              type: 'TextArea'
            },
            {
              type: 'TextInput'
            }
          ]
        }
      ]
    }
  ]
};

const addressFor = (targetId, node = form, path = []) => {
  if (node.type === targetId) { // NOTE change `node.type` to `node.id`
    return path;
  }

  if (node.children) {
    return node.children.reduce((memo, child, index) => {
      return memo || addressFor(targetId, child, [ ...path, index ]);
    }, null);
  }

  return null;
};

// NOTE pass the unique id instead of the type
console.log('addressFor', 'Form', addressFor('Form'));
console.log('addressFor', 'FormSection', addressFor('FormSection'));
console.log('addressFor', 'TextArea', addressFor('TextArea'));
console.log('addressFor', 'TextInput', addressFor('TextInput'));

const addressFor2 = (targetId, node = form, path = []) => {
  if (node.type === targetId) { // NOTE change `node.type` to `node.id`
    return path;
  }

  if (node.children) {
    for (const index = 0; node.children.length > index; index++) {
      const child = node.children[index];
      const found = addressFor2(targetId, child, [ ...path, index ]);

      if (found) {
        return [ ...path, index ];
      }
    }
  }

  return null;
};

// NOTE pass the unique id instead of the type
console.log('addressFor2', 'Form', addressFor('Form'));
console.log('addressFor2', 'FormSection', addressFor('FormSection'));
console.log('addressFor2', 'TextArea', addressFor('TextArea'));
console.log('addressFor2', 'TextInput', addressFor('TextInput'));
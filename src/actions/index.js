export const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

export const addformentity = (formEntity) => {
  console.log('addformentity action hit ', formEntity)
  return {
    type: 'ADDFORMENTITY',
    formEntity: formEntity
  }
}

export const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}

export const initformentity = () => {
  return {
    type: 'INITFORMENTITY',
  }
}


/*
  -- alternate method of exporting (for only 1 action) --
const increment = { type: 'INCREMENT' }
export default increment;
*/
// export const INCREMENT = 'INCREMENT'
// export const increment = { type: 'INCREMENT' };
// export const DECREMENT = 'DECREMENT'
// export const decrement = { type: 'DECREMENT' };
// export const ADDFORMENTITY = 'ADDFORMENTITY'
// export const addformentity = { type: 'ADDFORMENTITY' };

export const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

export const addformentity = (inputType) => {
  return {
    type: 'ADDFORMENTITY',
    inputType: inputType
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
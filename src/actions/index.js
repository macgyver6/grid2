export const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

export const addformentity = (formEntity, path) => {
  return {
    type: 'ADDFORMENTITY',
    formEntity: formEntity,
    path: path
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

export const savestate = () => {
  return {
    type: 'SAVESTATE',
  }
}

export const loadstate = () => {
  return {
    type: 'LOADSTATE',
  }
}
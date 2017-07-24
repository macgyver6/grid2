export const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

export const addformentity = (formEntity) => {
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
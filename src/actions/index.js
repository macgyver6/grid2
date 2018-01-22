export const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

export const addformentity = (formEntity, path, section) => {
  return {
    type: 'ADDFORMENTITY',
    formEntity: formEntity,
    path,
    section
  }
}

export const removeformentity = (path) => {
  return {
    type: 'REMOVEFORMENTITY',
    path
  }
}

export const mutateformentity = (path, properties, section) => {
  return {
    type: 'MUTATEFORMENTITY',
    path,
    properties,
    section
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

export const changetab = (tab) => {
  console.log(tab)
  return {
    type: 'CHANGETAB',
    tab
  }
}


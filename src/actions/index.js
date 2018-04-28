export const increment = () => {
  return {
    type: 'INCREMENT',
  };
};

export const add = (path, entity, section) => {
  return {
    type: 'ADD',
    entity: entity,
    path,
    section,
  };
};

export const remove = path => {
  return {
    type: 'REMOVE',
    path,
  };
};

export const mutate = (path, properties, section) => {
  return {
    type: 'MUTATE',
    path,
    properties,
    section,
  };
};

export const formmutate = (path, properties, section) => {
  return {
    type: 'FORMMUTATE',
    path,
    properties,
    section,
  };
};

export const decrement = () => {
  return {
    type: 'DECREMENT',
  };
};

export const initformentity = () => {
  return {
    type: 'INITFORMENTITY',
  };
};

export const savestate = () => {
  return {
    type: 'SAVESTATE',
  };
};

export const loadstate = () => {
  return {
    type: 'LOADSTATE',
  };
};

export const changetab = tab => {
  return {
    type: 'CHANGETAB',
    tab,
  };
};

export const temporalStateChange = payload => {
  console.log(payload);
  return { type: 'temporalStateChange', payload };
};

export const dtLocalFilesSaved = dateTime => {
  return { type: 'DTLOCALFILESSAVED', dateTime };
};

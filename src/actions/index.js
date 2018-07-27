export const batchActions = actionsArr => ({
  type: 'BATCH_ACTIONS',
  actionsArr,
});

export const increment = () => ({
  type: 'INCREMENT',
});

export const add = (path, entity, section) => ({
  type: 'ADD',
  entity: entity,
  path,
  section,
});

export const remove = path => ({
  type: 'REMOVE',
  path,
});

export const mutate = (path, properties, section) => ({
  type: 'MUTATE',
  path,
  properties,
  section,
});

export const mutateandadd = (path, properties, pathToAdd, entityToAdd, section) => ({
  type: 'MUTATEANDADD',
  path,
  properties,
  pathToAdd,
  entityToAdd,
  section,
});

export const mutateaddremove = (path, properties, pathToAdd, entityToAdd, pathToRemove, section) => ({
  type: 'MUTATEADDREMOVE',
  path,
  properties,
  pathToAdd,
  entityToAdd,
  pathToRemove,
  section,
});

export const formmutate = properties => ({
  type: 'FORMMUTATE',
  properties,
});

export const decrement = () => ({
  type: 'DECREMENT',
});

export const initformentity = () => ({
  type: 'INITFORMENTITY',
});

export const savestate = () => ({
  type: 'SAVESTATE',
});

export const loadstate = () => ({
  type: 'LOADSTATE',
});

export const changetab = tab => ({
  type: 'CHANGETAB',
  tab,
});

export const temporalStateChange = payload => {
  console.log(payload);
  return { type: 'temporalStateChange', payload };
};

export const dtLocalFilesSaved = dateTime => ({ type: 'DTLOCALFILESSAVED', dateTime });

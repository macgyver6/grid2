export const sampleMiddleware = store => next => action => {
         // console.log('dispatching', action);
         let result = next(action);
         // console.log('next state', store.getState().form);
         return result;
       };
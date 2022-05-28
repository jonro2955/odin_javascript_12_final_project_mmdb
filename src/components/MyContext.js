import { createContext } from 'react';

/* The initial dummy values will be changed to useful data or functions 
by assigning them to the context provider's 'value' prop */
export const MyContext = {
  addToWatchList: createContext('initialDummyValue'),
  someOther: createContext('initialDummyValue'),
};


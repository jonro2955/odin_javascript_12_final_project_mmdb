import { createContext } from 'react';

/* The initial dummy values will be changed to useful data or functions 
when its context provider's 'value' props are passed in */
export const MyContext = {
  AddToList: createContext('initialDummyValue'),
  SomeOther: createContext('initialDummyValue'),
};


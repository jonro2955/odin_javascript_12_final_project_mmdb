import { createContext } from 'react';

/* The 'initialDummyValue' below will be changed to useful data and 
functions in the form of an object when this context provider's 
'value' prop is provided in App.js. I.e. :
<MyContext.Provider value={..object..}>)
Those useful data and functions inside the object can then be consumed 
by child components that import this file using:

import { MyContext } from './MyContext';
const contextProps = useContext(MyContext);
contextProps...//use things from the provided object)  
 */
export const MyContext = createContext('initialDummyValue');


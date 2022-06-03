import { createContext } from 'react';

/* The 'initialDummyValue' below will be changed to useful data and 
functions when this context provider's 
'value' prop is provided in App.js. I.e. :
<AppContext.Provider value={..object..}/>
Those useful data and functions inside the object can then be consumed 
by child components that import this file using:

import { AppContext } from './contexts/AppContext';
const AppContext = useContext(AppContext);
AppContext...//use things from the provided object)  
 */
export const AppContext = createContext('initialDummyValue');

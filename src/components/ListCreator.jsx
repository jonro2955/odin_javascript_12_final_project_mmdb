import { useContext } from 'react';
import { AppContext } from './AppContext';
import { ListsContext } from './ListsContext';

export default function ListCreator(props) {
  const appContext = useContext(AppContext);
  const listsContext = useContext(ListsContext);

  return (
    <div className='listCreator'>
      <h3>Create New List</h3>
      <form
        className='listCreatorForm'
        onSubmit={() => {
          const inputField = document.getElementById('listCreatorInput');
          listsContext.createNewList(appContext, inputField.value);
          inputField.value = '';
          listsContext.turnCreatorOff();
        }}
      >
        <label htmlFor='listCreatorInput'>List Name: </label>
        <input id='listCreatorInput' type='text' autoFocus={true} />
        <button type='submit'>Create</button>
      </form>
      <button
        style={{ position: 'absolute', top: '5px', right: '5px' }}
        onClick={() => {
          listsContext.turnCreatorOff();
        }}
      >
        Cancel
      </button>
    </div>
  );
}

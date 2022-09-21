import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { ListsContext } from '../contexts/ListsContext';

export default function ListCreator() {
  const appContext = useContext(AppContext);
  const listsContext = useContext(ListsContext);

  return (
    <div className='listCreator'>
      <h3>List Name</h3>
      <form
        className='listCreatorForm'
        onSubmit={() => {
          const inputField = document.getElementById('listCreatorInput');
          appContext.createNewList(inputField.value);
          inputField.value = '';
          listsContext.turnCreatorOff();
        }}
      >
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

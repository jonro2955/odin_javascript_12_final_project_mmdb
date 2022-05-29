import { useState } from 'react';

export default function ListsPage({ user, createNewList }) {
  const [creatorOn, setCreatorOn] = useState(false);

  function createList(name) {
    alert(name);
  }

  return (
    <div className='page'>
      {user ? (
        // signed in
        <>
          <h1>Lists Page</h1>
          <button
            onClick={() => {
              setCreatorOn(!creatorOn);
            }}
          >
            +
          </button>
          {creatorOn && (
            <div id='listCreator'>
              <h3>New List</h3>
              <form id='listCreatorForm'>
                <label htmlFor='listCreatorInput'>List Name: </label>
                <input id='listCreatorInput' type='text' />
                <button
                  onClick={() => {
                    createNewList(
                      document.getElementById('listCreatorInput').value
                    );
                  }}
                >
                  Create
                </button>
              </form>
              <button
                onClick={() => {
                  setCreatorOn(!creatorOn);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </>
      ) : (
        // signed out
        <>
          <div>Please log in</div>
        </>
      )}
    </div>
  );
}

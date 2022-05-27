export default function ListsPage({ user }) {
  return (
    <div className='page'>
      {user ? (
        // signed in
        <>
          <div>Lists Page</div>
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

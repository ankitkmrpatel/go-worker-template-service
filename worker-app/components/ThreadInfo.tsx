export const ThreadInfoComponent = ({ thread }: { thread: any }) => {
  return (
    <div>
      <h3>Thread Information</h3>
      <p>ID: {thread.id}</p>
      <p>Name: {thread.name}</p>
      {/* Add more thread info as necessary */}
    </div>
  );
};

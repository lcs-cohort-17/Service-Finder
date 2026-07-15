// lina savedRoutes.jsx
const styles = {
  emptyState: {
    color: "#666",
    lineHeight: 1.5,
  },
  list: {
    paddingLeft: 20,
  },
};

function SavedRoutes() {
  // TODO: replace with real saved-routes data once that store/API exists.
  const savedRoutes = [];

  if (savedRoutes.length === 0) {
    return (
      <p style={styles.emptyState}>
        No saved routes yet. Plan a route, then hit 'Save this route'.
      </p>
    );
  }

  return (
    <ul style={styles.list}>
      {savedRoutes.map((route) => (
        <li key={route.id}>{route.name}</li>
      ))}
    </ul>
  );
}

export default SavedRoutes;
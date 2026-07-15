import type { CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
  emptyState: {
    color: "#666",
    lineHeight: 1.5,
  },
  list: {
    paddingLeft: 20,
  },
};

function SavedRoutes(): React.JSX.Element {
  // TODO: replace with real saved-routes data once that store/API exists.
  const savedRoutes: { id: string; name: string }[] = [];

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

function SavedRoutesTab() {
  // TODO: replace with real saved-routes data once that store/API exists.
  const savedRoutes: { id: string; name: string }[] = [];

  if (savedRoutes.length === 0) {
    return (
      <p className="leading-relaxed text-slate-500">
        No saved routes yet. Plan a route, then hit 'Save this route'.
      </p>
    );
  }

  return (
    <ul className="pl-5">
      {savedRoutes.map((route) => (
        <li key={route.id}>{route.name}</li>
      ))}
    </ul>
  );
}

export default SavedRoutesTab;

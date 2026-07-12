# Service Finder - User Story

## Status
Implemented

## Title
Implement a public service map and category filter for residents

## User Story
As a resident, I want to view public services on a map and filter them by category, so that I can quickly find nearby support services such as clinics, hospitals, shelters, and emergency facilities.

## Technical Requirements
- Build the feature using React for the user interface.
- Display a map-style view that shows available public service locations.
- Store service data with fields such as id, name, category, latitude, and longitude.
- Allow users to filter services by selecting one or more categories.
- Update the visible results dynamically when filters change.
- Show a live count of matching services.
- Include a loading state while service data is being prepared.
- Structure the implementation so mock data can later be replaced with real API or database data.

## Acceptance Criteria
- When the app loads, public service locations are shown in the map view.
- When a user selects one or more categories, only matching services are displayed.
- When a user deselects all categories, all services are shown again.
- The results count updates correctly based on the active filters.
- The interface remains clear and usable when no services match the selected filters.
- The feature works locally without visible errors.

## Definition of Done
- The feature is implemented and works as expected in the local app.
- Category filtering updates the displayed services correctly.
- The UI is clear, readable, and responsive.
- The implementation is structured in a maintainable way for future integration with real data.

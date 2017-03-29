DESIGN
===

Designing Component Hierarchy
---

### Presentational Components

- `Auth` is a from to field in OAuth clientId and apiKey.
- `EventList` is a list showing visible events.
  - `events: Array` is an array of event items with { id, title, color, address } shape.
- `EventItem` is a single event item.
  - title
  - color
  - address
- `Editor` is where we let the user change currently visible event.
- `App` is the root component that renders everything else.

### Container Components

- `ifAuth` check if auth.
- `VisibleEventList` filters the events according to the current visibility filter and renders a EventList.

### Other Components

- `AddEvent` is a from to field in a new event item.

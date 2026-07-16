# TODO - SEARCH-003 TypeScript hardening (no `any`)

## Plan (high level)
- Update `transformData.ts`:
  - Add strict `RawServiceData` interface (optional fields).
  - Update `transformServiceData` signature to accept `RawServiceData`.
  - Remove `any` usage and keep defensive conversions.
- Update `useServiceStore.ts`:
  - Update `fetchServices` to fetch live data.
  - On success: transform with `transformServiceData` and set state.
  - On failure: set state from `mockServices`.
  - Remove `any` usage in cache mapping, json parsing, and caching call.

## Steps
1. Modify `src/utils/transformData.ts` to introduce `RawServiceData` and remove `any`.
2. Modify `src/store/useServiceStore.ts` to remove `any` and implement graceful fallback to `mockServices`.
3. Run TypeScript typecheck / build to ensure zero TS compilation errors.


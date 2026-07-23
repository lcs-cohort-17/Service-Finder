import { describe, it, expect } from 'vitest';
import { getStatusFromOpeningHours } from '../../../utils/getServiceStatus';

describe('getStatusFromOpeningHours', () => {
  it('returns unknown for missing or invalid hours', () => {
    expect(getStatusFromOpeningHours(undefined, new Date('2026-07-22T10:00:00'))).toBe('unknown');
    expect(getStatusFromOpeningHours('--', new Date('2026-07-22T10:00:00'))).toBe('unknown');
    expect(getStatusFromOpeningHours('not a real schedule', new Date('2026-07-22T10:00:00'))).toBe('unknown');
  });

  it('uses the supplied time to determine whether a service is open', () => {
    const now = new Date('2026-07-22T10:00:00');
    expect(getStatusFromOpeningHours('Mo-Fr 09:00-17:00', now)).toBe('open');
    expect(getStatusFromOpeningHours('Mo-Fr 09:00-17:00', new Date('2026-07-22T18:00:00'))).toBe('closed');
  });
});

import type { CommunityReport } from '../types/report';
import type { CSSProperties } from 'react';

/**
Returns CSS styles for a community report marker pin.
- Active reports → blue pin with "R"
- Resolved reports → grey pin with "✓"
 */
export function getReportMarkerStyle(report: CommunityReport): {
  pin: CSSProperties;
  innerText: CSSProperties;
} {
  const isResolved = report.status === 'resolved';

  return {
    pin: {
      width: '24px',
      height: '24px',
      backgroundColor: isResolved ? '#9e9e9e' : '#3498db',   // grey / blue
      borderRadius: '50% 50% 50% 0',
      transform: 'rotate(-45deg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.2s',
      border: isResolved ? '2px solid #7d7d7d' : '2px solid #2980b9',
    },
    innerText: {
      transform: 'rotate(45deg)',
      color: 'white',
      fontSize: '12px',
      fontWeight: 'bold',
      lineHeight: '1',
    },
  };
}
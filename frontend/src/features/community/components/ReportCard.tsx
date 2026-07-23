import type { CommunityReport } from '../types/report';
import { useCanResolve } from '../hooks/useCanResolve';
import { useReportActions } from '../hooks/useReportActions';
import { ResolvedBadge } from './ResolvedBadge';
import { useState } from 'react';

interface ReportCardProps {
  report: CommunityReport;
}

/*
Displays a single community report.
- If resolved: greyed out background and a "Resolved" badge.
- Shows a "Mark as Resolved" button only if the current user has permission.
 */
export function ReportCard({ report }: ReportCardProps) {
  const canResolve = useCanResolve(report);
  const { resolveReport } = useReportActions();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResolve = async () => {
    setIsUpdating(true);
    setError(null);
    try {
      await resolveReport(report);
      // Real-time update will be handled by ticket COMMUNITY-003 onSnapshot
    } catch (err) {
      setError('Failed to mark as resolved. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const isResolved = report.status === 'resolved';

  return (
    <div
      className={`rounded-lg border p-4 shadow-sm transition-colors ${
        isResolved
          ? 'bg-gray-100 border-gray-300 text-gray-500'   // greyed out
          : 'bg-white border-gray-200 text-gray-900'
      }`}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-medium">{report.title}</h3>
        {isResolved && <ResolvedBadge />}
      </div>

      <p className="mt-1 text-sm">{report.description}</p>

      {/* Shows "Mark as Resolved" button only for active reports & authorized users */}
      {!isResolved && canResolve && (
        <div className="mt-3">
          <button
            onClick={handleResolve}
            disabled={isUpdating}
            className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700 disabled:opacity-50"
          >
            {isUpdating ? 'Updating...' : 'Mark as Resolved'}
          </button>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
      )}

      {/* Shows resolution timestamp if resolved */}
      {isResolved && report.resolvedAt && (
        <p className="mt-2 text-xs">
          Resolved on: {new Date(report.resolvedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}
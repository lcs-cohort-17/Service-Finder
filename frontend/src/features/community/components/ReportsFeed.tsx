//(OnkeMbin/dev/Sprint-2-community-reports-feed-ui //
import type { CommunityReport } from '../../../types/community.types';
import { ReportCard } from './ReportCard';

export interface ReportsFeedProps {
  reports: CommunityReport[];
  isLoading: boolean;
  loadError?: string;
  canManage: (report: CommunityReport) => boolean;
  onChangeStatus: (id: string, status: CommunityReport['status']) => void;
}

function LoadingState() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-44 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
        />
      ))}
      <span className="sr-only">Loading community reports…</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
      <span className="text-3xl">📭</span>
      <h3 className="mt-3 text-base font-semibold text-slate-800">No reports yet</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        Be the first to let your community know about roadworks, accidents, or
        anything else worth flagging nearby.
      </p>
    </div>
  );
}

export function ReportsFeed({
  reports,
  isLoading,
  loadError,
  canManage,
  onChangeStatus,
}: ReportsFeedProps) {
  if (isLoading) return <LoadingState />;

  if (loadError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
        {loadError}
      </div>
    );
  }

  if (reports.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          canManage={canManage(report)}
          onChangeStatus={onChangeStatus}
        />
      ))}
    </div>
  );
}

export default ReportsFeed;

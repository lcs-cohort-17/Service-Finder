//(OnkeMbin/dev/Sprint-2-community-reports-feed-ui //
import type { CommunityReport } from '../../../types/community.types';
import { REPORT_STATUS_LABELS } from '../../../types/community.types';

const CATEGORY_STYLES: Record<CommunityReport['category'], string> = {
  Accident: 'bg-red-100 text-red-700',
  Roadworks: 'bg-amber-100 text-amber-700',
  Traffic: 'bg-orange-100 text-orange-700',
  Hijacking: 'bg-rose-100 text-rose-700',
  Flooding: 'bg-sky-100 text-sky-700',
  Other: 'bg-slate-100 text-slate-700',
};

const STATUS_STYLES: Record<CommunityReport['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  resolved: 'bg-green-100 text-green-800',
};

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function formatLocation(report: CommunityReport): string {
  if (report.address && report.address.trim().length > 0) return report.address;
  return `${report.latitude.toFixed(4)}, ${report.longitude.toFixed(4)}`;
}

export interface ReportCardProps {
  report: CommunityReport;
  canManage?: boolean;
  onChangeStatus?: (id: string, status: CommunityReport['status']) => void;
}

export function ReportCard({ report, canManage = false, onChangeStatus }: ReportCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_STYLES[report.category]}`}
        >
          {report.category}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[report.status]}`}
        >
          {REPORT_STATUS_LABELS[report.status]}
        </span>
      </div>

      <h3 className="text-base font-semibold text-slate-900">{report.title}</h3>

      <p className="text-sm text-slate-600">{truncate(report.description, 100)}</p>

      {report.photoUrl && (
        <img
          src={report.photoUrl}
          alt=""
          className="h-32 w-full rounded-lg object-cover"
        />
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
        <span>📍 {formatLocation(report)}</span>
        <span>🕒 {formatDateTime(report.createdAt)}</span>
        <span>👤 {report.createdBy || report.createdByEmail}</span>
      </div>

      {canManage && onChangeStatus && (
        <div className="flex gap-2 border-t border-slate-100 pt-3">
          {(['pending', 'in-progress', 'resolved'] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => onChangeStatus(report.id, status)}
              disabled={report.status === status}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                report.status === status
                  ? 'cursor-not-allowed bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {REPORT_STATUS_LABELS[status]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportCard;

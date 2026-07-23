// ===========================
// Onke Mbingeleli - COMMUNITY-001/002 //
// ===========================
//
// Composes the feed (COMMUNITY-001) and the create-report form
// (COMMUNITY-002 x2, merged — see CreateReportForm.tsx for why).
// Auth guard: only logged-in users can view/use this page, matching
// both tickets' "accessible only to logged-in users" requirement.
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useCommunityReports } from '../features/community/hooks/useCommunityReports';
import { ReportsFeed } from '../features/community/components/ReportsFeed';
import { CreateReportForm } from '../features/community/components/CreateReportForm';

export interface CommunityReportsPageProps {
  onRequireAuth?: () => void;
}

export function CommunityReportsPage({ onRequireAuth }: CommunityReportsPageProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  const {
    reports,
    isLoading,
    loadError,
    createReport,
    isSubmitting,
    updateReportStatus,
    canManage,
    toast,
    dismissToast,
  } = useCommunityReports();

  // AC: unauthenticated users are redirected to login.
  useEffect(() => {
    if (!isAuthenticated) {
      onRequireAuth?.();
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, onRequireAuth, navigate]);

  if (!isAuthenticated) return null;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Community Reports</h1>
        <p className="mt-1 text-sm text-slate-500">
          See what's happening nearby, or let others know about something
          worth flagging.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr,360px]">
        <div>
          <ReportsFeed
            reports={reports}
            isLoading={isLoading}
            loadError={loadError}
            canManage={canManage}
            onChangeStatus={updateReportStatus}
          />
        </div>

        <div className="lg:sticky lg:top-4 lg:self-start">
          <CreateReportForm onSubmit={createReport} isSubmitting={isSubmitting} />
        </div>
      </div>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 left-1/2 z-[2200] -translate-x-1/2 rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-lg ${
            toast.variant === 'success' ? 'bg-slate-900' : 'bg-red-600'
          }`}
        >
          {toast.message}
          <button type="button" className="ml-3 opacity-70 hover:opacity-100" onClick={dismissToast}>
            ✕
          </button>
        </div>
      )}
    </main>
  );
}

export default CommunityReportsPage;

//(OnkeMbin/dev/Sprint-2-community-reports-feed-ui //

import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import type {
  CommunityReport,
  NewCommunityReportInput,
  ReportStatus,
} from '../../../types/community.types';

const STORAGE_KEY = 'sf_community_reports';
const SIMULATED_LATENCY_MS = 600;

function readAll(): CommunityReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CommunityReport[]) : [];
  } catch {
    return [];
  }
}

function writeAll(list: CommunityReport[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function useCommunityReports() {
  const currentUser = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ variant: 'success' | 'error'; message: string } | null>(
    null
  );

  const loadReports = useCallback(() => {
    setIsLoading(true);
    setLoadError('');
    setTimeout(() => {
      try {
        const list = readAll().sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setReports(list);
      } catch {
        setLoadError('Could not load community reports.');
      } finally {
        setIsLoading(false);
      }
    }, SIMULATED_LATENCY_MS);
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const createReport = useCallback(
    (input: NewCommunityReportInput): Promise<CommunityReport> => {
      return new Promise((resolve, reject) => {
        if (!isAuthenticated || !currentUser) {
          reject(new Error('You need to be logged in to submit a report.'));
          return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
          try {
            const record: CommunityReport = {
              id: `cr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
              ...input,
              createdBy: `${currentUser.first_name} ${currentUser.last_name}`.trim(),
              createdByEmail: currentUser.email,
              createdAt: new Date().toISOString(),
              status: 'pending',
            };
            const list = [record, ...readAll()];
            writeAll(list);
            setReports(list);
            setIsSubmitting(false);
            setToast({ variant: 'success', message: 'Report Created — thanks for letting us know!' });
            resolve(record);
          } catch (err) {
            setIsSubmitting(false);
            setToast({ variant: 'error', message: "Couldn't submit your report — please try again." });
            reject(err instanceof Error ? err : new Error('Failed to create report.'));
          }
        }, SIMULATED_LATENCY_MS);
      });
    },
    [isAuthenticated, currentUser]
  );

  const updateReportStatus = useCallback(
    (id: string, status: ReportStatus) => {
      const list = readAll().map((r) =>
        r.id === id && r.createdByEmail === currentUser?.email ? { ...r, status } : r
      );
      writeAll(list);
      setReports(
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      );
    },
    [currentUser]
  );

  return {
    reports,
    isLoading,
    loadError,
    reloadReports: loadReports,
    createReport,
    isSubmitting,
    updateReportStatus,
    toast,
    dismissToast: () => setToast(null),
    canManage: (report: CommunityReport) => report.createdByEmail === currentUser?.email,
  };
}

export default useCommunityReports;


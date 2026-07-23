//(OnkeMbin/dev/Sprint-2-community-reports-feed-ui //

export type ReportCategory =
  | 'Accident'
  | 'Roadworks'
  | 'Traffic'
  | 'Hijacking'
  | 'Flooding'
  | 'Other';

export const REPORT_CATEGORIES: ReportCategory[] = [
  'Accident',
  'Roadworks',
  'Traffic',
  'Hijacking',
  'Flooding',
  'Other',
];

export type ReportStatus = 'pending' | 'in-progress' | 'resolved';

export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  resolved: 'Resolved',
};


export interface CommunityReport {
  id: string;
  category: ReportCategory;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  address?: string;
  photoUrl?: string;
  createdBy: string;
  createdByEmail: string;
  createdAt: string;
  status: ReportStatus;
}

export type NewCommunityReportInput = Omit<
  CommunityReport,
  'id' | 'createdBy' | 'createdByEmail' | 'createdAt' | 'status'
>;

export interface CommunityReportFormValues {
  category: ReportCategory | '';
  title: string;
  description: string;
  manualAddress: string;
}

export type CommunityReportFormErrors = Partial<
  Record<keyof CommunityReportFormValues | 'location', string>
>;

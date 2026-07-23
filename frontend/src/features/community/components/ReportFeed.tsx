import { useCommunityReports } from '../hooks/useCommunityReports';
import { ReportCard } from './ReportCard';

/*
Main feed that displays all community reports.
Relies on ticket COMMUNITY-003 (the placeholder hook) for data.
 */
export function ReportFeed() {
  const { reports, loading, error } = useCommunityReports();

  if (loading) {
    return <div className="p-4 text-center">Loading reports...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        Error loading reports: {error.message}
      </div>
    );
  }

  if (!reports.length) {
    return <div className="p-4 text-center text-gray-500">No reports yet.</div>;
  }

  return (
    <div className="space-y-4 p-4">
      {/* You may add a report count header here if you desire */}
      <h2 className="text-xl font-semibold">
        Community Reports ({reports.length})
      </h2>
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
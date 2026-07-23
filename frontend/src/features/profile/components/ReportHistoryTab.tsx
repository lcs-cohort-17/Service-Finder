function ReportHistoryTab() {
  // TODO: replace with real report-history data once that store/API exists.
  const reports: { id: string; title: string }[] = [];

  if (reports.length === 0) {
    return (
      <p className="leading-relaxed text-slate-500">
        No reports yet. Drop a hazard pin, post in Community reports, or
        suggest a place on the map.
      </p>
    );
  }

  return (
    <ul className="pl-5">
      {reports.map((report) => (
        <li key={report.id}>{report.title}</li>
      ))}
    </ul>
  );
}

export default ReportHistoryTab;

const styles = {
  emptyState: {
    color: "#666",
    lineHeight: 1.5,
  },
  list: {
    paddingLeft: 20,
  },
};

function ReportHistory() {
  // TODO: replace with real report-history data once that store/API exists.
  const reports = [];

  if (reports.length === 0) {
    return (
      <p style={styles.emptyState}>
        No reports yet. Drop a hazard pin, post in Community reports, or
        suggest a place on the map.
      </p>
    );
  }

  return (
    <ul style={styles.list}>
      {reports.map((report) => (
        <li key={report.id}>{report.title}</li>
      ))}
    </ul>
  );
}

export default ReportHistory;
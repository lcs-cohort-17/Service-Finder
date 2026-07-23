import React, { useState, useCallback, useEffect } from 'react';
import SuggestionCard from './SuggestionCard';
import { useServiceStore } from '../../../store/useServiceStore';

export interface ReviewQueueProps {
  isAdmin?: boolean;
}

interface LogEntry {
  timestamp: string;
  action: string;
  suggestionName: string;
}

/**
 * ADMIN-010 / Admin Review Suggestions page content.
 * Lists pending service suggestions via useServiceStore, each with Verify
 * Location, Approve, and Reject actions.
 */
const ReviewQueue: React.FC<ReviewQueueProps> = ({ isAdmin }) => {
  const services = useServiceStore((state) => state.services);
  const isLoading = useServiceStore((state) => state.loading);
  const error = useServiceStore((state) => state.error);
  const fetchAllPendingServices = useServiceStore((state) => state.fetchAllPendingServices);
  const moderateSuggestedServices = useServiceStore((state) => state.moderateSuggestedServices);

  const [log, setLog] = useState<LogEntry[]>([]);

  useEffect(() => {
    void fetchAllPendingServices();
  }, [fetchAllPendingServices]);

  const addLog = useCallback((action: string, suggestionName: string): void => {
    setLog((previous) => [
      { timestamp: new Date().toLocaleTimeString(), action, suggestionName },
      ...previous,
    ]);
  }, []);

  const handleApprove = useCallback(
    async (id: string): Promise<void> => {
      const target = services.find((service) => service.id === id);
      await moderateSuggestedServices(id, 'approved');
      if (target) addLog('Approved', target.name);
    },
    [services, moderateSuggestedServices, addLog]
  );

  const handleReject = useCallback(
    async (id: string): Promise<void> => {
      const target = services.find((service) => service.id === id);
      await moderateSuggestedServices(id, 'declined');
      if (target) addLog('Rejected', target.name);
    },
    [services, moderateSuggestedServices, addLog]
  );

  const handleVerify = useCallback(
    (address: string, suggestionId: string): void => {
      const target = services.find((service) => service.id === suggestionId);
      if (target) addLog('Location verified (opened in Maps)', target.name);
    },
    [services, addLog]
  );

  return (
    <div className="review-queue">
<section className="review-queue-header">

  <div className="review-header-left">

    <p className="review-label">
      ADMINISTRATOR
    </p>

    <h1 className="review-title">
      Suggestion review queue
    </h1>

    <p className="review-subtitle">
      Accept a suggestion to publish it on the public map.
      Rejected suggestions stay hidden.
    </p>

  </div>

  <div className="review-stats">

    <div className="stat-card">
      <span className="stat-title">Pending</span>
      <strong>{services.length}</strong>
    </div>

    <div className="stat-card">
      <span className="stat-title">Approved</span>
      <strong>0</strong>
    </div>

    <div className="stat-card">
      <span className="stat-title">Rejected</span>
      <strong>0</strong>
    </div>

  </div>

</section>

      <section className="review-queue-content">
        {isLoading ? (
          <div className="empty-state">
            <p>Loading suggestions...</p>
          </div>
        ) : error ? (
          <div className="empty-state" role="alert">
            <p>{error}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="empty-state">
            <p>No suggestions left to review.</p>
          </div>
        ) : (
          <div className="suggestions-list">
            {services.map((suggestion) => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onApprove={handleApprove}
                onReject={handleReject}
                onVerify={handleVerify}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )}
      </section>

      {log.length > 0 && (
        <section className="review-queue-log">
          <h3>Action Log</h3>
          <ul className="log-list">
            {log.map((entry, index) => (
              <li key={index} className="log-entry">
                <span className="log-timestamp">{entry.timestamp}</span>
                <span className="log-action">{entry.action}</span>
                <span className="log-name">{entry.suggestionName}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ReviewQueue;
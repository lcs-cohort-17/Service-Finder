import React, { useState, useCallback, useEffect } from 'react';
import SuggestionCard, { type Suggestion } from './SuggestionCard';
import { approveSuggestion, getPendingSuggestions, rejectSuggestion } from '../../../api/serviceApi';

export interface ReviewQueueProps {
  isAdmin?: boolean;
}

interface LogEntry {
  timestamp: string;
  action: string;
  suggestionName: string;
}

const ReviewQueue: React.FC<ReviewQueueProps> = ({ isAdmin }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSuggestions = async (): Promise<void> => {
      try {
        setError(null);
        setSuggestions(await getPendingSuggestions());
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load suggestions.');
      } finally {
        setIsLoading(false);
      }
    };
    void loadSuggestions();
  }, []);

  const addLog = useCallback((action: string, suggestionName: string): void => {
    setLog((previous) => [
      { timestamp: new Date().toLocaleTimeString(), action, suggestionName },
      ...previous,
    ]);
  }, []);

  const handleApprove = useCallback(async (id: string): Promise<void> => {
    const target = suggestions.find((suggestion) => suggestion.id === id);
    if (!target) return;
    try {
      setError(null);
      await approveSuggestion(id);
      addLog('Approved', target.name);
      setSuggestions((previous) => previous.filter((suggestion) => suggestion.id !== id));
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : 'Unable to approve suggestion.');
    }
  }, [suggestions, addLog]);

  const handleReject = useCallback(async (id: string): Promise<void> => {
    const target = suggestions.find((suggestion) => suggestion.id === id);
    if (!target) return;
    try {
      setError(null);
      await rejectSuggestion(id);
      addLog('Rejected', target.name);
      setSuggestions((previous) => previous.filter((suggestion) => suggestion.id !== id));
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : 'Unable to reject suggestion.');
    }
  }, [suggestions, addLog]);

  const handleVerify = useCallback((address: string, suggestionId: string): void => {
    const target = suggestions.find((suggestion) => suggestion.id === suggestionId);
    if (target) addLog('Location verified (opened in Maps)', target.name);
  }, [suggestions, addLog]);

  return (
    <div className="review-queue">
      <section className="review-queue-header">
        <h2>Review Suggestions</h2>
        <p className="review-queue-count">
          {suggestions.length === 0 ? 'No suggestions to review' : `${suggestions.length} suggestion${suggestions.length !== 1 ? 's' : ''} pending`}
        </p>
      </section>
      <section className="review-queue-content">
        {isLoading ? <div className="empty-state"><p>Loading suggestions...</p></div>
          : error ? <div className="empty-state" role="alert"><p>{error}</p></div>
          : suggestions.length === 0 ? <div className="empty-state"><p>No suggestions left to review.</p></div>
          : <div className="suggestions-list">
              {suggestions.map((suggestion) => <SuggestionCard key={suggestion.id} suggestion={suggestion} onApprove={handleApprove} onReject={handleReject} onVerify={handleVerify} isAdmin={isAdmin} />)}
            </div>}
      </section>
      {log.length > 0 && <section className="review-queue-log">
        <h3>Action Log</h3>
        <ul className="log-list">{log.map((entry, index) => <li key={index} className="log-entry"><span className="log-timestamp">{entry.timestamp}</span><span className="log-action">{entry.action}</span><span className="log-name">{entry.suggestionName}</span></li>)}</ul>
      </section>}
    </div>
  );
};

export default ReviewQueue;
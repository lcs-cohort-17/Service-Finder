import React, { useEffect, useState } from 'react';
import type { Services } from './service.types';
import { getServiceStatus } from '../../../utils/getServiceStatus';

interface ServiceStatusBadgeProps {
  service: Services;
}

export function ServiceStatusBadge({ service }: ServiceStatusBadgeProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const status = getServiceStatus(service, now);
  const label = status === 'open' ? 'Open Now' : status === 'closed' ? 'Closed' : 'Hours Unavailable';
  const icon = status === 'open' ? '🟢' : status === 'closed' ? '🔴' : '🟡';

  return (
    <div className={`status-badge ${status}`} aria-live="polite">
      {icon} {label}
    </div>
  );
}
// src/hooks/useApiUsage.ts (or keep it in store/useApiUsageStore.ts as a custom hook)
import { useState, useEffect, useCallback } from 'react';
import { getApiUsageData, incrementApiCount, DAILY_LIMIT } from '../utils/apiUsageStorage';

export const useApiUsage = () => {
  const [count, setCount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isWarning, setIsWarning] = useState(false);
  const [isExceeded, setIsExceeded] = useState(false);

  const load = useCallback(() => {
    const data = getApiUsageData();
    const pct = (data.count / DAILY_LIMIT) * 100;
    setCount(data.count);
    setPercentage(Math.min(pct, 100));
    setIsWarning(pct >= 80 && pct < 100);
    setIsExceeded(pct >= 100);
  }, []);

  const increment = useCallback(() => {
    const newCount = incrementApiCount();
    const pct = (newCount / DAILY_LIMIT) * 100;
    setCount(newCount);
    setPercentage(Math.min(pct, 100));
    setIsWarning(pct >= 80 && pct < 100);
    setIsExceeded(pct >= 100);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    count,
    limit: DAILY_LIMIT,
    percentage,
    isWarning,
    isExceeded,
    increment,
    load,
  };
};
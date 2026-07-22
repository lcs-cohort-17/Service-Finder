// src/utils/apiUsageStorage.ts
const STORAGE_KEY = 'api_usage';
export const DAILY_LIMIT = 1000; // Change this to your actual API limit

interface ApiUsageData {
  count: number;
  date: string; // YYYY-MM-DD
}

// Get today's date string (UTC-based. Adjust if your API uses a different timezone)
const getToday = (): string => new Date().toISOString().split('T')[0];

// Read data, auto-reset if the date has changed
export const getApiUsageData = (): ApiUsageData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const data: ApiUsageData = JSON.parse(stored);
      const today = getToday();
      if (data.date !== today) {
        // Reset for new day
        const newData = { count: 0, date: today };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        return newData;
      }
      return data;
    } catch {
      // fall through to default
    }
  }
  // No valid stored data
  const newData = { count: 0, date: getToday() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  return newData;
};

// Increment count by 1 and save
export const incrementApiCount = (): number => {
  const data = getApiUsageData();
  const newCount = data.count + 1;
  const newData = { count: newCount, date: data.date };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  return newCount;
};

// Reset manually (if needed)
export const resetApiCount = (): void => {
  const newData = { count: 0, date: getToday() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};
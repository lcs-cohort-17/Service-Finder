import { useMemo } from 'react';
import { FilterButtons } from './features/filters/components/FilterButtons';
import { useFilters, IncidentCategory } from './features/filters/hooks/useFilters';

interface MockReport {
  id: number;
  title: string;
  category: Exclude<IncidentCategory, 'All'>;
  description: string;
  location: string;
  timestamp: string;
  upvotes: number;
  status: 'open' | 'resolved' | 'in-progress';
}

const MOCK_REPORTS: MockReport[] = [
  {
    id: 1,
    title: 'Multi-vehicle collision on N1',
    category: 'Accidents',
    description: 'Three-car pile-up near the Rivonia off-ramp, emergency services on scene.',
    location: 'N1 Highway, Rivonia',
    timestamp: '2025-03-15T08:30:00Z',
    upvotes: 12,
    status: 'in-progress',
  },
  {
    id: 2,
    title: 'Roadworks on William Nicol',
    category: 'Roadworks',
    description: 'Road crew resurfacing the southbound lanes between Sunset and Witkoppen.',
    location: 'William Nicol Drive',
    timestamp: '2025-03-15T06:00:00Z',
    upvotes: 8,
    status: 'open',
  },
  {
    id: 3,
    title: 'Heavy traffic on M1 South',
    category: 'Traffic',
    description: 'Stop-and-go traffic from Grayston Drive to the Crown Interchange due to an earlier accident.',
    location: 'M1 South, Sandton',
    timestamp: '2025-03-15T07:45:00Z',
    upvotes: 24,
    status: 'open',
  },
  {
    id: 4,
    title: 'Suspicious vehicle in Bramley',
    category: 'Hijackings',
    description: 'A dark sedan has been circling the block repeatedly. Residents advised to be vigilant.',
    location: 'Bramley, Johannesburg',
    timestamp: '2025-03-14T22:15:00Z',
    upvotes: 15,
    status: 'open',
  },
  {
    id: 5,
    title: 'Flash flooding on Jan Smuts Ave',
    category: 'Flooding',
    description: 'Water levels rising rapidly near the bridge. Vehicles advised to use alternative routes.',
    location: 'Jan Smuts Avenue, Rosebank',
    timestamp: '2025-03-14T16:20:00Z',
    upvotes: 31,
    status: 'open',
  },
  {
    id: 6,
    title: 'Single-car accident on Rivonia Road',
    category: 'Accidents',
    description: 'Vehicle hit a lamppost. Driver is shaken but uninjured. Towing in progress.',
    location: 'Rivonia Road, Sandton',
    timestamp: '2025-03-14T14:00:00Z',
    upvotes: 5,
    status: 'resolved',
  },
  {
    id: 7,
    title: 'Pothole reporting near Mall of Africa',
    category: 'Other',
    description: 'Large pothole forming in the left lane approaching the intersection. Hazardous for smaller vehicles.',
    location: 'Magwa Crescent, Midrand',
    timestamp: '2025-03-13T10:30:00Z',
    upvotes: 7,
    status: 'open',
  },
  {
    id: 8,
    title: 'Roadworks on Grayston Drive',
    category: 'Roadworks',
    description: 'Utility maintenance causing lane closures between West Street and Rivonia Road.',
    location: 'Grayston Drive, Sandton',
    timestamp: '2025-03-13T09:00:00Z',
    upvotes: 4,
    status: 'in-progress',
  },
];

const CATEGORY_COLORS: Record<MockReport['category'], string> = {
  Accidents: 'bg-red-500',
  Roadworks: 'bg-yellow-500',
  Traffic: 'bg-orange-500',
  Hijackings: 'bg-purple-500',
  Flooding: 'bg-blue-500',
  Other: 'bg-gray-500',
};

const CATEGORY_BG_COLORS: Record<MockReport['category'], string> = {
  Accidents: 'bg-red-100 text-red-800',
  Roadworks: 'bg-yellow-100 text-yellow-800',
  Traffic: 'bg-orange-100 text-orange-800',
  Hijackings: 'bg-purple-100 text-purple-800',
  Flooding: 'bg-blue-100 text-blue-800',
  Other: 'bg-gray-100 text-gray-800',
};

function App() {
  const { selectedCategories, toggleCategory } = useFilters();

  const filteredReports = useMemo(() => {
    if (selectedCategories.includes('All')) {
      return MOCK_REPORTS;
    }
    return MOCK_REPORTS.filter((report) =>
      selectedCategories.includes(report.category)
    );
  }, [selectedCategories]);

  const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    return date.toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 px-4">Service Finder</h1>
        <p className="text-gray-500 mb-6 px-4">React + TypeScript + TailwindCSS scaffold for the Service Finder app.</p>

        <div className="border-t border-b border-gray-100 py-4 mb-6">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">
            Filter Community Reports (Sprint 2)
          </p>
          <FilterButtons
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
          />
        </div>

        {/* Reactive Grid: Map Markers + Community Feed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 px-4">
          {/* Simulated Map Markers */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              Map Markers ({filteredReports.length})
            </h2>
            <div className="bg-gray-100 rounded-lg p-4 border border-gray-200 min-h-[300px]">
              <div className="relative w-full h-full min-h-[260px] bg-gray-200 rounded-md overflow-hidden">
                {/* Simulated mini-map background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 opacity-50"></div>
                <div className="absolute inset-0">
                  {/* Grid lines to simulate map */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>
                {/* Simulated markers */}
                {filteredReports.map((report, index) => {
                  const positions = [
                    { top: '20%', left: '30%' },
                    { top: '45%', left: '60%' },
                    { top: '65%', left: '25%' },
                    { top: '35%', left: '75%' },
                    { top: '70%', left: '55%' },
                    { top: '25%', left: '45%' },
                    { top: '55%', left: '15%' },
                    { top: '80%', left: '70%' },
                  ];
                  const pos = positions[index % positions.length];
                  return (
                    <div
                      key={report.id}
                      className="absolute group cursor-pointer transition-transform hover:scale-125"
                      style={{ top: pos.top, left: pos.left }}
                      title={report.title}
                    >
                      <div className={`w-5 h-5 ${CATEGORY_COLORS[report.category]} rounded-full border-2 border-white shadow-md flex items-center justify-center`}>
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                        {report.title}
                      </div>
                    </div>
                  );
                })}
                {/* Map attribution */}
                <div className="absolute bottom-1 left-1 text-[10px] text-gray-500 bg-white/70 px-1 rounded">
                  Simulated Map
                </div>
              </div>
            </div>
          </div>

          {/* Community Feed */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              Community Feed
              <span className="text-sm font-normal text-gray-400">({filteredReports.length} reports)</span>
            </h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {filteredReports.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <p className="text-lg mb-1">No reports match the selected filters</p>
                  <p className="text-sm">Try selecting a different category above.</p>
                </div>
              ) : (
                filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{report.title}</h3>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${CATEGORY_BG_COLORS[report.category]}`}
                      >
                        {report.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 leading-relaxed">{report.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {report.location}
                        </span>
                        <span>{formatTimestamp(report.timestamp)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          {report.upvotes}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          report.status === 'resolved' ? 'bg-green-100 text-green-700' :
                          report.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mx-4 p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-xs">
          Active Filter State: {JSON.stringify(selectedCategories)}
        </div>
      </div>
    </div>
  );
}

export default App;

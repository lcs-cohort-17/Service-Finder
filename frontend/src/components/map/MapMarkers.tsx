import React, { useState } from 'react';
import type { MapMarkersProps, ServiceMarker } from '../../types/map.types';
import MarkerPreview from './MarkerPreview';
import { useCommunityReports } from '../../features/community/hooks/useCommunityReports';
import { getReportMarkerStyle } from '../../features/community/utils/mapMarkerUtils';
import type { CommunityReport } from '../../features/community/types/report';

/*
Renders service markers and community report markers on the custom map.

PLACEHOLDER: Community reports are fetched via a placeholder hook
(useCommunityReports) that currently returns an empty array.
Once ticket COMMUNITY-003 is complete, real‑time Firestore data will appear automatically.
 */
const MapMarkers: React.FC<MapMarkersProps> = ({
  markers,
  onMarkerClick,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<ServiceMarker | null>(null);
  const [selectedReport, setSelectedReport] = useState<CommunityReport | null>(null);

  // PLACEHOLDER – will be replaced by the real Firestore subscription
  const { reports } = useCommunityReports();

  // ---- Service marker handlers ----
  const handleMarkerClick = (marker: ServiceMarker) => {
    setSelectedMarker(marker);
    setSelectedReport(null); // clear any open report preview

    if (onMarkerClick) {
      onMarkerClick(marker);
    }
  };

  const handleClosePreview = () => {
    setSelectedMarker(null);
  };

  // ---- Report marker handlers ----
  const handleReportClick = (report: CommunityReport) => {
    // Toggle preview – close if clicking the same one, else show it
    setSelectedReport((prev) => (prev?.id === report.id ? null : report));
    setSelectedMarker(null);
  };

  return (
    <div className="map-markers">
      {/* ===== SERVICE MARKERS (unchanged) ===== */}
      {markers.map((marker) => (
        <div
          key={marker.id}
          onClick={() => handleMarkerClick(marker)}
          style={{
            position: 'absolute',
            cursor: 'pointer',
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#ff4757',
              borderRadius: '50% 50% 50% 0',
              transform: 'rotate(-45deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s',
            }}
          >
            <span
              style={{
                transform: 'rotate(45deg)',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              {marker.name.charAt(0)}
            </span>
          </div>
        </div>
      ))}

      {/* ===== COMMUNITY REPORT MARKERS ===== */}
      {reports.map((report) => {
        const { pin: pinStyle, innerText: textStyle } = getReportMarkerStyle(report);
        const isResolved = report.status === 'resolved';

        return (
          <div
            key={`report-${report.id}`}
            onClick={() => handleReportClick(report)}
            title={report.title}
            style={{
              position: 'absolute',
              cursor: 'pointer',
              transform: 'translate(-50%, -100%)',
              // PLACEHOLDER – replace with coordinate→pixel mapping later
              left: '50%',
              top: '50%',
            }}
          >
            <div style={pinStyle}>
              <span style={textStyle}>
                {isResolved ? '✓' : 'R'}
              </span>
            </div>
          </div>
        );
      })}

      {/* ===== PREVIEW PANELS ===== */}

      {/* Service marker preview (existing) */}
      {selectedMarker && (
        <MarkerPreview marker={selectedMarker} onClose={handleClosePreview} />
      )}

      {/* Community report preview (simple info box) */}
      {selectedReport && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '12px 16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1000,
            maxWidth: '250px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <strong>{selectedReport.title}</strong>
            <button
              onClick={() => setSelectedReport(null)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                marginLeft: '8px',
              }}
            >
              ✕
            </button>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#555' }}>
            {selectedReport.description}
          </p>
          {selectedReport.status === 'resolved' && (
            <span
              style={{
                display: 'inline-block',
                marginTop: '6px',
                padding: '2px 8px',
                fontSize: '12px',
                backgroundColor: '#e0e0e0',
                borderRadius: '10px',
                color: '#555',
              }}
            >
              Resolved
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default MapMarkers;
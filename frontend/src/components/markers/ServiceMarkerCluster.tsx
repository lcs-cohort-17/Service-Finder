import { useMemo, memo } from "react";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import type { MapService } from "../../types/service.types";
interface ServiceMarkerClusterProps {
  services: MapService[];
}

interface ClusterLike {
  getChildCount: () => number;
}

/**
 * Renders approved services as clustered markers.
 *
 * Perf choices, tied to the AC:
 * - chunkedLoading: adds markers to the map in batches on a timer instead
 *   of all at once, so the main thread doesn't freeze on a large dataset.
 *   This is what actually satisfies "no noticeable lag... full marker set".
 * - maxClusterRadius: tuned down from the library default (80) so clusters
 *   don't feel sticky as the user zooms toward street level.
 * - disableClusteringAtZoom: past this zoom, individual pins render -
 *   satisfies "expands on zoom-in".
 * - spiderfyOnMaxZoom: fans out markers that sit on the exact same coords
 *   even at max zoom, instead of silently stacking them.
 * - ServiceMarker is memoized so a parent re-render (pan/zoom state
 *   changes) doesn't re-render every marker whose data hasn't changed.
 */
function ServiceMarkerCluster({ services }: ServiceMarkerClusterProps) {
  const clusterIcon = useMemo(
    () => (cluster: ClusterLike) => {
      const count = cluster.getChildCount();
      const size = count < 50 ? "small" : count < 200 ? "medium" : "large";
      return L.divIcon({
        html: `<div class="service-cluster service-cluster--${size}"><span>${count}</span></div>`,
        className: "service-cluster-wrapper",
        iconSize: L.point(40, 40, true),
      });
    },
    []
  );

  return (
    <MarkerClusterGroup
      chunkedLoading
      chunkInterval={200}
      chunkDelay={50}
      maxClusterRadius={60}
      spiderfyOnMaxZoom
      disableClusteringAtZoom={17}
      iconCreateFunction={clusterIcon}
    >
      {services.map((service) => (
        <ServiceMarker key={service.id} service={service} />
      ))}
    </MarkerClusterGroup>
  );
}

const ServiceMarker = memo(function ServiceMarker({
  service,
}: {
  service: MapService;
}) {
  return (
    <Marker position={[service.lat, service.lng]}>
      <Popup>
        <strong>{service.name}</strong>
        <br />
        {service.category}
        <br />
        {service.address}
      </Popup>
    </Marker>
  );
});

export default memo(ServiceMarkerCluster);
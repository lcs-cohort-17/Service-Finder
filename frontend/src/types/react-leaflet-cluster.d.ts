declare module "react-leaflet-cluster" {
  import type { ComponentType, ReactNode } from "react";
  import type { DivIcon, Icon } from "leaflet";

  export interface MarkerClusterGroupProps {
    children?: ReactNode;

    // Chunked loading (batches marker insertion instead of blocking
    // the main thread on the full set at once)
    chunkedLoading?: boolean;
    chunkInterval?: number;
    chunkDelay?: number;
    chunkProgress?: (
      processed: number,
      total: number,
      elapsed: number
    ) => void;

    // Clustering behavior
    maxClusterRadius?: number | ((zoom: number) => number);
    disableClusteringAtZoom?: number;
    spiderfyOnMaxZoom?: boolean;
    showCoverageOnHover?: boolean;
    zoomToBoundsOnClick?: boolean;
    removeOutsideVisibleBounds?: boolean;
    animate?: boolean;
    animateAddingMarkers?: boolean;
    spiderfyDistanceMultiplier?: number;
    iconCreateFunction?: (cluster: any) => DivIcon | Icon;

    // Passthrough for anything else the underlying Leaflet.markercluster
    // option set supports without hand-declaring every field
    [key: string]: unknown;
  }

  const MarkerClusterGroup: ComponentType<MarkerClusterGroupProps>;
  export default MarkerClusterGroup;
} 
import "leaflet/dist/leaflet.css";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { DesktopPopup } from "../../features/service-details/components/DesktopPopup";
import { MobileBottomSheet } from "../../features/service-details/components/MobileBottomSheet";
import { MapControls } from "./MapControls";
import { MapMarkers } from "./MapMarkers";

/** Cape Town city centre - matches the reference design's default view. */
const DEFAULT_CENTER: [number, number] = [-33.9249, 18.4241];
const DEFAULT_ZOOM = 13;

export function MapContainer() {
  return (
    <div className="relative h-full min-h-[420px] w-full flex-1 overflow-hidden">
      <LeafletMap
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapMarkers />
        <MapControls />
      </LeafletMap>

      <DesktopPopup />
      <MobileBottomSheet />
    </div>
  );
}

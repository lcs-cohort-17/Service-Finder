import L from "leaflet";
import { useMemo } from "react";
import { Marker } from "react-leaflet";
import { useServiceContext } from "../../context/ServiceContext";
import { useFilterContext } from "../../context/FilterContext";
import { MarkerPopup } from "../markers/MarkerPopup";
import { getCategoryConfig } from "../markers/categoryConfig";

const iconCache = new Map<string, L.DivIcon>();

/** Builds (and caches) a teardrop pin icon coloured for a category, highlighting the selected marker. */
function getPinIcon(color: string, selected: boolean): L.DivIcon {
  const cacheKey = `${color}-${selected}`;
  const cached = iconCache.get(cacheKey);
  if (cached) return cached;

  const size = selected ? 38 : 30;
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C7.03 0 3 4.03 3 9c0 6.75 9 15 9 15s9-8.25 9-15c0-4.97-4.03-9-9-9z"
        fill="${color}" stroke="white" stroke-width="1.5" />
      <circle cx="12" cy="9" r="3.4" fill="white" />
    </svg>
  `;

  const icon = L.divIcon({
    html: svg,
    className: selected ? "sf-marker sf-marker-selected" : "sf-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });

  iconCache.set(cacheKey, icon);
  return icon;
}

/**
 * Ticket: renders one Leaflet marker per visible service. Clicking a
 * marker hands the service id to ServiceContext, which retrieves the
 * full record and derives the Directions/Street View URLs consumed by
 * the details panel via useServiceDetails.
 */
export function MapMarkers() {
  const { services, selectedService, selectService } = useServiceContext();
  const { isCategoryActive } = useFilterContext();

  const visibleServices = useMemo(
    () => services.filter((service) => isCategoryActive(service.type)),
    [services, isCategoryActive],
  );

  return (
    <>
      {visibleServices.map((service) => {
        const category = getCategoryConfig(service.type);
        const isSelected = selectedService?.id === service.id;

        return (
          <Marker
            key={service.id}
            position={[service.lat, service.lng]}
            icon={getPinIcon(category.color, isSelected)}
            eventHandlers={{
              click: () => selectService(service.id),
            }}
          >
            <MarkerPopup service={service} />
          </Marker>
        );
      })}
    </>
  );
}

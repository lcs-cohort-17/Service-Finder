import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

import {
  CATEGORY_STYLES,
  getCategoryMarkerIconUrl,
} from "../../components/markers/categoryConfig";

const START_POSITION: [number, number] = [-33.9249, 18.4241];

export default function MarkerStyleTest() {
  return (
    <>
      {Object.keys(CATEGORY_STYLES).map((category, index) => (
        <Marker
          key={category}
          position={[
            START_POSITION[0] + index * 0.002,
            START_POSITION[1],
          ]}
          icon={L.icon({
            iconUrl: getCategoryMarkerIconUrl(category),
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -35],
          })}
        >
          <Popup>
            <strong>{category}</strong>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
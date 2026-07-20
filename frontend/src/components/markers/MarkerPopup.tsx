import { Tooltip } from "react-leaflet";
import type { Service } from "../../types/service.types";
import { getCategoryConfig } from "./categoryConfig";

/**
 * Lightweight hover tooltip shown above a marker before the user clicks
 * it. Kept separate from the click-triggered DesktopPopup/MobileBottomSheet
 * details panel.
 */
export function MarkerPopup({ service }: { service: Service }) {
  const category = getCategoryConfig(service.type);

  return (
    <Tooltip direction="top" offset={[0, -34]} opacity={1}>
      <div className="flex items-center gap-1.5">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: category.color }}
        />
        <span className="font-medium">{service.name}</span>
      </div>
    </Tooltip>
  );
}

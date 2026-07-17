import React from "react";

// Explicit allowed enum variants for turn directions
export type TurnDirection = "LEFT" | "RIGHT" | "STRAIGHT" | "UTURN" | "ARRIVE";

export interface NavigationStep {
  id?: string;
  turnDirection: TurnDirection;
  streetName: string;
  distance: string;
  instructionText?: string;
}

interface InstructionListProps {
  steps: NavigationStep[];
}

const DIRECTION_ICONS: Record<TurnDirection, string> = {
  LEFT: "⬅️",
  RIGHT: "➡️",
  STRAIGHT: "⬆️",
  UTURN: "🔄",
  ARRIVE: "📍",
};

const InstructionList: React.FC<InstructionListProps> = ({ steps }) => {
  if (!steps || steps.length === 0) {
    return <p className="no-steps">No routing instructions available.</p>;
  }

  return (
    <div 
      className="instruction-list-container"
      style={{ 
        maxHeight: "350px", 
        overflowY: "auto", 
        border: "1px solid #ddd", 
        borderRadius: "4px",
        marginTop: "15px"
      }}
    >
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {steps.map((step, index) => (
          <li 
            key={step.id || index} 
            className="instruction-item" 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              padding: "12px", 
              borderBottom: index === steps.length - 1 ? "none" : "1px solid #eee" 
            }}
          >
            <span style={{ fontSize: "20px", marginRight: "15px" }} aria-hidden="true">
              {DIRECTION_ICONS[step.turnDirection] || "🗺️"}
            </span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: "600", color: "#333" }}>{step.streetName || "Unknown Street"}</div>
              <div style={{ fontSize: "13px", color: "#666" }}>
                {step.instructionText || "Proceed along route"} &bull; {step.distance}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructionList;
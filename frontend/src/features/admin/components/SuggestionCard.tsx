import { useState } from "react";

import VerifyLocationButton from "./VerifyLocationButton";
import GoogleMapsModal from "./GoogleMapsModal";

/*
========================================================

Suggestion Card

Displays a submitted service suggestion for review.

Allows administrators to:

• View submitted information
• Verify the location
• Open Google Maps preview

Future tickets will add:

• Approve
• Reject
• Firestore updates

========================================================
*/

interface Suggestion {

    id: string;

    name: string;

    category: string;

    address: string;

    operatingHours: string;

    latitude: number;

    longitude: number;

}

interface SuggestionCardProps {

    suggestion: Suggestion;

}

function SuggestionCard({

    suggestion,

}: SuggestionCardProps) {

    const [showMap, setShowMap] = useState(false);

    return (

        <article
            style={{
                border: "1px solid #d9d9d9",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "20px",
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
        >

            <h2>{suggestion.name}</h2>

            <p>

                <strong>Category:</strong>{" "}

                {suggestion.category}

            </p>

            <p>

                <strong>Address:</strong>{" "}

                {suggestion.address}

            </p>

            <p>

                <strong>Operating Hours:</strong>{" "}

                {suggestion.operatingHours}

            </p>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "20px",
                }}
            >

                <VerifyLocationButton

                    suggestion={suggestion}

                    onViewMap={() => setShowMap(true)}

                />

            </div>

            {showMap && (

                <GoogleMapsModal

                    suggestion={suggestion}

                    onClose={() => setShowMap(false)}

                />

            )}

        </article>

    );

}

export default SuggestionCard;
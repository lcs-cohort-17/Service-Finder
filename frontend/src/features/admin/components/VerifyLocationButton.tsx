import {

    generateGoogleMapsUrl,

} from "../utils/googleMaps";

/*
========================================================

Verify Location Button

Allows an administrator to verify the submitted
location before approving the suggestion.

Uses the shared Google Maps utility so all URL
generation is centralised.

========================================================
*/

interface Suggestion {

    id: string;

    latitude: number;

    longitude: number;

}

interface VerifyLocationButtonProps {

    suggestion: Suggestion;

    onViewMap: () => void;

}

function VerifyLocationButton({

    suggestion,

    onViewMap,

}: VerifyLocationButtonProps) {

    const openGoogleMaps = () => {

        const url = generateGoogleMapsUrl(

            suggestion.latitude,

            suggestion.longitude

        );

        if (url) {

            window.open(

                url,

                "_blank",

                "noopener,noreferrer"

            );

        }

    };

    return (

        <div
            style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
            }}
        >

            <button
                type="button"
                onClick={onViewMap}
                style={{
                    padding: "10px 18px",
                    cursor: "pointer",
                    borderRadius: "6px",
                    border: "none",
                    background: "#2563eb",
                    color: "#fff",
                }}
            >
                Preview Map
            </button>

            <button
                type="button"
                onClick={openGoogleMaps}
                style={{
                    padding: "10px 18px",
                    cursor: "pointer",
                    borderRadius: "6px",
                    border: "none",
                    background: "#16a34a",
                    color: "#fff",
                }}
            >
                Open Google Maps
            </button>

        </div>

    );

}

export default VerifyLocationButton;
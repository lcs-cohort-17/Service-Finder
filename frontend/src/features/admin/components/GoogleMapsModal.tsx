import {

    generateGoogleMapsEmbedUrl,

} from "../utils/googleMaps";

interface Suggestion {

    id: string;

    name: string;

    latitude: number;

    longitude: number;

}

interface GoogleMapsModalProps {

    suggestion: Suggestion;

    onClose: () => void;

}

function GoogleMapsModal({

    suggestion,

    onClose,

}: GoogleMapsModalProps) {

    const mapUrl = generateGoogleMapsEmbedUrl(

        suggestion.latitude,

        suggestion.longitude

    );

    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.55)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999,
            }}
        >

            <div
                style={{
                    background: "#ffffff",
                    width: "90%",
                    maxWidth: "850px",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}
            >

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "15px",
                    }}
                >

                    <h2>

                        Verify Location

                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            padding: "8px 14px",
                            cursor: "pointer",
                        }}
                    >
                        Close
                    </button>

                </div>

                <p>

                    <strong>Service:</strong>{" "}

                    {suggestion.name}

                </p>

                {mapUrl ? (

                    <iframe
                        title="Google Maps Preview"
                        src={mapUrl}
                        width="100%"
                        height="500"
                        style={{
                            border: 0,
                            borderRadius: "8px",
                        }}
                        loading="lazy"
                        allowFullScreen
                    />

                ) : (

                    <div
                        style={{
                            padding: "24px",
                            textAlign: "center",
                            color: "#666",
                        }}
                    >

                        Unable to load Google Maps preview.

                    </div>

                )}

            </div>

        </div>

    );

}

export default GoogleMapsModal;
import { useEffect, useMemo, useState } from "react";
import "./GoogleMapsModal.css";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function GoogleMapsModal({
    address,
    isOpen,
    onClose,
}) {
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    /*
    ============================================================
    Future Enhancement (ADMIN-011)

    Once Firestore stores latitude and longitude,
    replace the address query with:

    https://www.google.com/maps/embed/v1/place
    ?key=API_KEY
    &q=${latitude},${longitude}

    ============================================================
    */

    const hasAddress =
        address &&
        address.trim().length > 0;

    const embedUrl = useMemo(() => {
        if (!hasAddress) return "";

        return `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(
            address
        )}`;
    }, [address, hasAddress]);

    const googleMapsUrl = useMemo(() => {
        if (!hasAddress) return "#";

        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            address
        )}`;
    }, [address, hasAddress]);

    useEffect(() => {
        if (!isOpen) return;

        setLoading(true);
        setHasError(false);

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () =>
            document.removeEventListener(
                "keydown",
                handleEscape
            );
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="maps-modal-overlay"
            onClick={onClose}
        >
            <div
                className="maps-modal"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="maps-modal-header">
                    <div>
                        <h2>
                            📍 Verify Service
                            Location
                        </h2>

                        <p>
                            Use Google Maps to
                            confirm that this
                            service exists before
                            approving it.
                        </p>
                    </div>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {!hasAddress ? (
                    <div className="empty-state">
                        <h3>
                            Address Missing
                        </h3>

                        <p>
                            No address has been
                            supplied for this
                            service suggestion.
                        </p>

                        <p>
                            The administrator
                            cannot verify this
                            location until an
                            address has been
                            provided.
                        </p>
                    </div>
                ) : hasError ? (
                    <div className="error-state">
                        <h3>
                            Unable to load
                            Google Maps
                        </h3>

                        <p>
                            Please verify that
                            the address is
                            correct or try
                            again later.
                        </p>
                    </div>
                ) : (
                    <>
                        {loading && (
                            <div className="loading-overlay">
                                <div className="spinner"></div>

                                <p>
                                    Loading Google
                                    Maps...
                                </p>
                            </div>
                        )}

                        <iframe
                            title="Google Maps"
                            src={embedUrl}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            className="maps-frame"
                            onLoad={() =>
                                setLoading(false)
                            }
                            onError={() => {
                                setLoading(false);
                                setHasError(true);
                            }}
                        />
                    </>
                )}

                <div className="maps-footer">
                    {hasAddress && (
                        <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="google-button"
                        >
                            View in Google Maps
                        </a>
                    )}

                    <button
                        className="close-modal-button"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GoogleMapsModal;
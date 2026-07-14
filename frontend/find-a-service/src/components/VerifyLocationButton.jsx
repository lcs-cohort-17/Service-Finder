import { useState } from "react";

import GoogleMapsModal from "./GoogleMapsModal";

import {
    isValidAddress,
} from "../utils/googleMaps";

function VerifyLocationButton({ address }) {
    const [showModal, setShowModal] = useState(false);

    const handleVerifyLocation = () => {
        if (!isValidAddress(address)) {
            alert("A valid service address is required.");
            return;
        }

        setShowModal(true);
    };

    return (
        <>
            <button
                type="button"
                onClick={handleVerifyLocation}
                style={{
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                }}
            >
                Verify Location
            </button>

            <GoogleMapsModal
                address={address}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}

export default VerifyLocationButton;
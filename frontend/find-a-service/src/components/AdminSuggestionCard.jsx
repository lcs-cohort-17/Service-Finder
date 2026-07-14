import VerifyLocationButton from "./VerifyLocationButton";

function AdminSuggestionCard({ suggestion }) {
    return (
        <div
            style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
        >
            <h2
                style={{
                    marginTop: 0,
                    marginBottom: "15px",
                }}
            >
                {suggestion.name}
            </h2>

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

            <p>
                <strong>Submitted By:</strong>{" "}
                {suggestion.submittedBy}
            </p>

            {suggestion.tags?.length > 0 && (
                <>
                    <strong>Tags:</strong>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                            marginTop: "10px",
                            marginBottom: "20px",
                        }}
                    >
                        {suggestion.tags.map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    background: "#e0f2fe",
                                    color: "#0369a1",
                                    padding: "6px 12px",
                                    borderRadius: "20px",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </>
            )}

            <hr
                style={{
                    margin: "20px 0",
                }}
            />

            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                }}
            >
                {/* ======================================================

                   ADMIN-010 PLACEHOLDER

                   Approve/Reject buttons will eventually
                   live alongside Verify Location.

                   ====================================================== */}

                <button
                    disabled
                    style={{
                        padding: "10px 18px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#16a34a",
                        color: "#ffffff",
                        opacity: 0.5,
                        cursor: "not-allowed",
                    }}
                >
                    Approve
                </button>

                <button
                    disabled
                    style={{
                        padding: "10px 18px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#dc2626",
                        color: "#ffffff",
                        opacity: 0.5,
                        cursor: "not-allowed",
                    }}
                >
                    Reject
                </button>

                <VerifyLocationButton
                    address={suggestion.address}
                />
            </div>
        </div>
    );
}

export default AdminSuggestionCard;
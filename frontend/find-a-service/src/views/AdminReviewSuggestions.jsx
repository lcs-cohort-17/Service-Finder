import useSuggestionStore from "../store/useSuggestionStore";
import AdminSuggestionCard from "../components/AdminSuggestionCard";

function AdminReviewSuggestions() {
    const suggestions = useSuggestionStore(
        (state) => state.suggestions
    );

    return (
        <main
            style={{
                maxWidth: "1200px",
                margin: "40px auto",
                padding: "20px",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h1>Admin Review Suggestions</h1>

            <p>
                Review submitted service suggestions and verify
                their locations before approving or rejecting
                them.
            </p>

            <hr
                style={{
                    margin: "25px 0",
                }}
            />

            {/* ===============================================

                ADMIN-003 PLACEHOLDER

                This page currently displays mock suggestion
                data from useSuggestionStore.

                ADMIN-003 will replace this with Firestore
                data and separate the suggestions into:

                    • Pending
                    • Approved
                    • Rejected

                It will also provide:

                    • Live counters
                    • Approve button
                    • Reject button
                    • Admin-only routing

            ================================================ */}

            {suggestions.length === 0 ? (
                <div
                    style={{
                        textAlign: "center",
                        padding: "50px",
                        border: "1px dashed #ccc",
                        borderRadius: "10px",
                    }}
                >
                    <h2>No Suggestions Found</h2>

                    <p>
                        Placeholder data has not been loaded.
                    </p>
                </div>
            ) : (
                suggestions.map((suggestion) => (
                    <AdminSuggestionCard
                        key={suggestion.id}
                        suggestion={suggestion}
                    />
                ))
            )}
        </main>
    );
}

export default AdminReviewSuggestions;
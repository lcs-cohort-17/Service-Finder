import SuggestionCard from "../components/SuggestionCard";
import useSuggestionStore from "../hooks/useSuggestionStore";

/*
========================================================

Admin Dashboard

Displays all submitted service suggestions so an
administrator can review locations before approval.

Future tickets will connect this page to Firestore
and introduce approval workflows.

========================================================
*/

function AdminDashboard() {
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
                    <SuggestionCard
                        key={suggestion.id}
                        suggestion={suggestion}
                    />
                ))
            )}
        </main>
    );
}

export default AdminDashboard;
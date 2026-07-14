import { create } from "zustand";

/**
 * ============================================================
 * useSuggestionStore
 * ============================================================
 *
 * Placeholder store for ADMIN-011.
 *
 * This store temporarily replaces Firestore until
 * ADMIN-003 is completed.
 *
 * Future:
 * Replace mockSuggestions with Firestore data.
 * ============================================================
 */

const mockSuggestions = [
  {
    id: "1",
    name: "Woodstock Free Clinic",
    category: "Clinic",
    address: "10 Victoria Road, Woodstock, Cape Town",
    operatingHours: "08:00 - 16:00",
    submittedBy: "user1@example.com",
    status: "pending",
  },
  {
    id: "2",
    name: "Cape Town Public Library",
    category: "Library",
    address: "1 Parade Street, Cape Town",
    operatingHours: "09:00 - 17:00",
    submittedBy: "user2@example.com",
    status: "pending",
  },
  {
    id: "3",
    name: "Hope Shelter",
    category: "Shelter",
    address: "",
    operatingHours: "24 Hours",
    submittedBy: "user3@example.com",
    status: "pending",
  },
];

const useSuggestionStore = create((set) => ({
  /**
   * Temporary suggestion list.
   *
   * Replace with Firestore when
   * ADMIN-003 is implemented.
   */
  suggestions: mockSuggestions,

  /**
   * Future helper.
   *
   * Replace this with Firestore
   * fetching logic.
   */
  loadSuggestions: () => {
    set({
      suggestions: mockSuggestions,
    });
  },

  /**
   * Future helper.
   *
   * ADMIN-003 will replace this
   * with Firestore status updates.
   */
  updateSuggestionStatus: (id, status) => {
    set((state) => ({
      suggestions: state.suggestions.map((suggestion) =>
        suggestion.id === id
          ? {
              ...suggestion,
              status,
            }
          : suggestion
      ),
    }));
  },

  /**
   * Convenience helper.
   */
  getPendingSuggestions: () => {
    return mockSuggestions.filter(
      (suggestion) =>
        suggestion.status === "pending"
    );
  },
}));

export default useSuggestionStore;
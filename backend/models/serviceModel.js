import { db } from '../config/firebase.js';

/**
 * Get all approved services from Firestore
 * @returns {Promise<Array>} Array of service documents
 */
export const getAllServices = async () => {
  try {
    const snapshot = await db.collection('services').get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('[ServiceModel] Error fetching all services:', error);
    throw error;
  }
};

/**
 * Get a single service by ID
 * @param {string} serviceId - Service document ID
 * @returns {Promise<Object>} Service document data
 */
export const getServiceById = async (serviceId) => {
  try {
    const doc = await db.collection('services').doc(serviceId).get();
    if (!doc.exists) {
      throw new Error('Service not found');
    }
    return {
      id: doc.id,
      ...doc.data(),
    };
  } catch (error) {
    console.error('[ServiceModel] Error fetching service by ID:', error);
    throw error;
  }
};

/**
 * Get all pending suggestions (not yet approved or rejected)
 * @returns {Promise<Array>} Array of pending suggestion documents
 */
export const getPendingSuggestions = async () => {
  try {
    const snapshot = await db
      .collection('services')
      .where('status', '==', 'pending')
      .get();

    return snapshot.docs.map((doc) => {
      const service = doc.data();
      return {
        id: doc.id,
        ...service,
        type: service.category ?? service.type ?? 'Other',
        submittedBy: service.submittedBy ?? 'Unknown',
      };
    });
  } catch (error) {
    console.error('[ServiceModel] Error fetching pending suggestions:', error);
    throw error;
  }
};

/**
 * Get a single suggestion by ID
 * @param {string} suggestionId - Suggestion document ID
 * @returns {Promise<Object>} Suggestion document data
 */
export const getSuggestionById = async (suggestionId) => {
  try {
    const doc = await db.collection('services').doc(suggestionId).get();
    if (!doc.exists) {
      throw new Error('Suggestion not found');
    }
    const service = doc.data();
    return {
      id: doc.id,
      ...service,
      type: service.category ?? service.type ?? 'Other',
      submittedBy: service.submittedBy ?? 'Unknown',
    };
  } catch (error) {
    console.error('[ServiceModel] Error fetching suggestion by ID:', error);
    throw error;
  }
};

/**
 * Create a new service from an approved suggestion
 * @param {Object} serviceData - Service details
 * @returns {Promise<Object>} Created service with ID
 */
export const createService = async (serviceData) => {
  try {
    const docRef = await db.collection('services').add({
      ...serviceData,
      createdAt: new Date().toISOString(),
      verified: true,
    });
    
    return {
      id: docRef.id,
      ...serviceData,
    };
  } catch (error) {
    console.error('[ServiceModel] Error creating service:', error);
    throw error;
  }
};

/**
 * Create a new suggestion
 * @param {Object} suggestionData - Suggestion details
 * @returns {Promise<Object>} Created suggestion with ID
 */
export const createSuggestion = async (suggestionData) => {
  try {
    const docRef = await db.collection('suggestions').add({
      ...suggestionData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    
    return {
      id: docRef.id,
      ...suggestionData,
    };
  } catch (error) {
    console.error('[ServiceModel] Error creating suggestion:', error);
    throw error;
  }
};

/**
 * Approve a suggestion (create service and update suggestion status)
 * @param {string} suggestionId - ID of suggestion to approve
 * @returns {Promise<Object>} Created service document
 */
export const approveSuggestion = async (suggestionId) => {
  try {
    const suggestionRef = db.collection('services').doc(suggestionId);
    const suggestionDoc = await suggestionRef.get();
    if (!suggestionDoc.exists) {
      throw new Error('Suggestion not found');
    }

    await suggestionRef.update({
      status: 'approved',
      verified: true,
      approvedAt: new Date().toISOString(),
    });

    const service = suggestionDoc.data();
    return {
      id: suggestionDoc.id,
      ...service,
      status: 'approved',
      verified: true,
      type: service.category ?? service.type ?? 'Other',
      submittedBy: service.submittedBy ?? 'Unknown',
    };
  } catch (error) {
    console.error('[ServiceModel] Error approving suggestion:', error);
    throw error;
  }
};

/**
 * Reject a suggestion
 * @param {string} suggestionId - ID of suggestion to reject
 * @param {string} reason - Reason for rejection
 * @returns {Promise<void>}
 */
export const rejectSuggestion = async (suggestionId, reason = '') => {
  try {
    const suggestionRef = db.collection('services').doc(suggestionId);
    const suggestionDoc = await suggestionRef.get();
    if (!suggestionDoc.exists) {
      throw new Error('Suggestion not found');
    }

    await suggestionRef.update({
      status: 'rejected',
      rejectedAt: new Date().toISOString(),
      rejectionReason: reason,
    });
  } catch (error) {
    console.error('[ServiceModel] Error rejecting suggestion:', error);
    throw error;
  }
};

/**
 * Search services by name or type
 * @param {string} query - Search query
 * @param {string} category - Category filter (optional)
 * @returns {Promise<Array>} Filtered services
 */
export const searchServices = async (query, category = null) => {
  try {
    let queryRef = db.collection('services');

    // Add category filter if provided
    if (category) {
      queryRef = queryRef.where('type', '==', category);
    }

    const snapshot = await queryRef.get();

    // Filter by search query (name or address)
    const results = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter(
        (service) =>
          service.name.toLowerCase().includes(query.toLowerCase()) ||
          service.address.toLowerCase().includes(query.toLowerCase())
      );

    return results;
  } catch (error) {
    console.error('[ServiceModel] Error searching services:', error);
    throw error;
  }
};
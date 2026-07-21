import * as serviceModel from '../models/serviceModel.js';

/**
 * Get all approved services
 * @route GET /api/services
 */
export const getAllServices = async (req, res) => {
  try {
    const services = await serviceModel.getAllServices();
    res.json({
      success: true,
      data: services,
      count: services.length,
    });
  } catch (error) {
    console.error('[ServiceController] Error fetching all services:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch services',
      message: error.message,
    });
  }
};

/**
 * Get a single service by ID
 * @route GET /api/services/:id
 */
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await serviceModel.getServiceById(id);
    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('[ServiceController] Error fetching service:', error);
    if (error.message === 'Service not found') {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service',
      message: error.message,
    });
  }
};

/**
 * Get all pending suggestions
 * @route GET /api/services/suggestions/pending
 */
export const getPendingSuggestions = async (req, res) => {
  try {
    const suggestions = await serviceModel.getPendingSuggestions();
    res.json({
      success: true,
      data: suggestions,
      count: suggestions.length,
    });
  } catch (error) {
    console.error('[ServiceController] Error fetching pending suggestions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch suggestions',
      message: error.message,
    });
  }
};

/**
 * Get a single suggestion by ID
 * @route GET /api/services/suggestions/:id
 */
export const getSuggestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const suggestion = await serviceModel.getSuggestionById(id);
    res.json({
      success: true,
      data: suggestion,
    });
  } catch (error) {
    console.error('[ServiceController] Error fetching suggestion:', error);
    if (error.message === 'Suggestion not found') {
      return res.status(404).json({
        success: false,
        error: 'Suggestion not found',
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to fetch suggestion',
      message: error.message,
    });
  }
};

/**
 * Create a new service
 * @route POST /api/services
 */
export const createService = async (req, res) => {
  try {
    const { name, type, address, description } = req.body;

    // Validate required fields
    if (!name || !type || !address) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, type, address',
      });
    }

    const service = await serviceModel.createService({
      name,
      type,
      address,
      description,
    });

    res.status(201).json({
      success: true,
      data: service,
      message: 'Service created successfully',
    });
  } catch (error) {
    console.error('[ServiceController] Error creating service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create service',
      message: error.message,
    });
  }
};

/**
 * Create a new suggestion
 * @route POST /api/services/suggestions
 */
export const createSuggestion = async (req, res) => {
  try {
    const { name, type, address, description, submittedBy } = req.body;

    // Validate required fields
    if (!name || !type || !address || !submittedBy) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, type, address, submittedBy',
      });
    }

    const suggestion = await serviceModel.createSuggestion({
      name,
      type,
      address,
      description,
      submittedBy,
    });

    res.status(201).json({
      success: true,
      data: suggestion,
      message: 'Suggestion created successfully',
    });
  } catch (error) {
    console.error('[ServiceController] Error creating suggestion:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create suggestion',
      message: error.message,
    });
  }
};

/**
 * Approve a suggestion
 * @route POST /api/services/suggestions/:id/approve
 */
export const approveSuggestion = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await serviceModel.approveSuggestion(id);
    res.json({
      success: true,
      data: service,
      message: 'Suggestion approved successfully',
    });
  } catch (error) {
    console.error('[ServiceController] Error approving suggestion:', error);
    if (error.message === 'Suggestion not found') {
      return res.status(404).json({
        success: false,
        error: 'Suggestion not found',
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to approve suggestion',
      message: error.message,
    });
  }
};

/**
 * Reject a suggestion
 * @route POST /api/services/suggestions/:id/reject
 */
export const rejectSuggestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    await serviceModel.rejectSuggestion(id, reason || '');

    res.json({
      success: true,
      message: 'Suggestion rejected successfully',
    });
  } catch (error) {
    console.error('[ServiceController] Error rejecting suggestion:', error);
    if (error.message === 'Suggestion not found') {
      return res.status(404).json({
        success: false,
        error: 'Suggestion not found',
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to reject suggestion',
      message: error.message,
    });
  }
};

/**
 * Search services
 * @route GET /api/services/search
 * @query {string} q - Search query
 * @query {string} category - Category filter (optional)
 */
export const searchServices = async (req, res) => {
  try {
    const { q, category } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query (q) is required',
      });
    }

    const results = await serviceModel.searchServices(q, category || null);

    res.json({
      success: true,
      data: results,
      count: results.length,
    });
  } catch (error) {
    console.error('[ServiceController] Error searching services:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search services',
      message: error.message,
    });
  }
};
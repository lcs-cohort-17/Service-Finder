const allowedTypes = ['clinic', 'hospital', 'school', 'library', 'shelter', 'police', 'taxi', 'bus_stop', 'train_station'];

export const validateSubmission = (req, res, next) => {
  const { name, category, coordinates } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters.' });
  }

  if (!allowedTypes.includes(category)) {
    return res.status(400).json({
      error: `Invalid type. Allowed types: ${allowedTypes.join(', ')}`
    });
  }

  if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
    return res.status(400).json({ error: 'Valid coordinates are required.' });
  }

  next();
};
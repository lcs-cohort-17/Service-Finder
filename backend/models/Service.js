class Service {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || "";
    this.category = data.category || "";
    this.address = data.address || "";

    this.coordinates = {
      latitude: data.coordinates?.latitude ?? 0,
      longitude: data.coordinates?.longitude ?? 0,
    };

    this.phone = data.phone || "";
    this.website = data.website || "";
    this.openingHours = data.openingHours || "";
    this.wheelchair = data.wheelchair || "";
    this.source = data.source || "overpass";
    this.status = data.status || "approved";
    this.importedAt = data.importedAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  // Check if service has all required fields
  isValid() {
    return (
      this.name &&
      this.category &&
      !isNaN(this.coordinates.latitude) &&
      !isNaN(this.coordinates.longitude) &&
      this.coordinates.latitude >= -90 &&
      this.coordinates.latitude <= 90 &&
      this.coordinates.longitude >= -180 &&
      this.coordinates.longitude <= 180
    );
  }

  // Convert to Firestore format
  toFirestore() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      address: this.address,
      coordinates: {
        latitude: this.coordinates.latitude,
        longitude: this.coordinates.longitude,
      },
      phone: this.phone,
      website: this.website,
      openingHours: this.openingHours,
      wheelchair: this.wheelchair,
      source: this.source,
      status: this.status,
      importedAt: this.importedAt,
      updatedAt: this.updatedAt,
    };
  }
}

export default Service;
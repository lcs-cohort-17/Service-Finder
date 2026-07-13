class Service {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || "";
    this.category = data.category || "";
    this.address = data.address || "";
    this.latitude = data.latitude || 0;
    this.longitude = data.longitude || 0;
    this.phone = data.phone || "";
    this.website = data.website || "";
    this.openingHours = data.openingHours || "";
    this.wheelchair = data.wheelchair || "";
    this.source = data.source || "overpass";
    this.status = data.status || "approved";
    this.importedAt = data.importedAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  } // Check if service has all required fields

  isValid() {
    return (
      this.name &&
      this.category &&
      this.latitude &&
      this.longitude &&
      !isNaN(this.latitude) &&
      !isNaN(this.longitude) &&
      this.latitude >= -90 &&
      this.latitude <= 90 &&
      this.longitude >= -180 &&
      this.longitude <= 180
    );
  } // Convert to Firestore format

  toFirestore() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude,
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

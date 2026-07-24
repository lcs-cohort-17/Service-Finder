import axios from "axios";

import { db } from "../config/firebase.js";
import Service from "../models/Service.js";

const OVERPASS_URL =
  process.env.OVERPASS_URL || "https://overpass-api.de/api/interpreter";

/**
 * Maps OSM tags -> our standardized category keys.
 * These keys must match frontend CategoryId keys.
 */
const mapOsmTagsToCategory = (tags = {}) => {
  const amenity = tags.amenity;
  const office = tags.office;
  const shop = tags.shop;

  if (amenity === "hospital") return "hospital";
  if (amenity === "police") return "police_station";
  if (amenity === "pharmacy") return "pharmacy";
  if (amenity === "dentist") return "dentist";
  if (amenity === "animal_shelter") return "spca";
  if (amenity === "fire_station") return "fire_station";
  if (office === "government") return "home_affairs";
  if (shop === "mall") return "mall";
  if (amenity === "school") return "school";
  if (amenity === "university") return "university";

  return null;
};

const pickAddress = (tags = {}) => {
  const addressParts = [
    tags["addr:housenumber"],
    tags["addr:street"],
    tags["addr:city"],
    tags["addr:postcode"],
    tags["addr:country"],
  ].filter(Boolean);

  if (addressParts.length > 0) return addressParts.join(", ");
  return tags.name || "";
};

const toService = ({ id, tags = {}, lat, lon }) => {
  const category = mapOsmTagsToCategory(tags);
  if (!category) return null;

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

  return new Service({
    id: String(id),
    name: tags.name || "",
    category,
    address: pickAddress(tags),
    latitude: lat,
    longitude: lon,
    phone: tags.phone || "",
    website: tags.website || "",
    openingHours: tags.opening_hours || "",
    wheelchair: tags.wheelchair || "",
    source: "overpass",
    status: "approved",
    importedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
};

const buildOverpassQuery = ({ centerLat, centerLng, radiusMeters }) => {
  // Expanded categories within a radius.
  // We request both ways and relations; `out center` gives us coordinates.
  const base = `(
    node(around:${radiusMeters},${centerLat},${centerLng})[amenity=hospital];
    way(around:${radiusMeters},${centerLat},${centerLng})[amenity=hospital];
    relation(around:${radiusMeters},${centerLat},${centerLng})[amenity=hospital];

    node(around:${radiusMeters},${centerLat},${centerLng})[amenity=police];
    way(around:${radiusMeters},${centerLat},${centerLng})[amenity=police];
    relation(around:${radiusMeters},${centerLat},${centerLng})[amenity=police];

    node(around:${radiusMeters},${centerLat},${centerLng})[amenity=pharmacy];
    way(around:${radiusMeters},${centerLat},${centerLng})[amenity=pharmacy];
    relation(around:${radiusMeters},${centerLat},${centerLng})[amenity=pharmacy];

    node(around:${radiusMeters},${centerLat},${centerLng})[amenity=dentist];
    way(around:${radiusMeters},${centerLat},${centerLng})[amenity=dentist];
    relation(around:${radiusMeters},${centerLat},${centerLng})[amenity=dentist];

    node(around:${radiusMeters},${centerLat},${centerLng})[amenity=animal_shelter];
    way(around:${radiusMeters},${centerLat},${centerLng})[amenity=animal_shelter];
    relation(around:${radiusMeters},${centerLat},${centerLng})[amenity=animal_shelter];

    node(around:${radiusMeters},${centerLat},${centerLng})[amenity=fire_station];
    way(around:${radiusMeters},${centerLat},${centerLng})[amenity=fire_station];
    relation(around:${radiusMeters},${centerLat},${centerLng})[amenity=fire_station];

    node(around:${radiusMeters},${centerLat},${centerLng})[office=government];
    way(around:${radiusMeters},${centerLat},${centerLng})[office=government];
    relation(around:${radiusMeters},${centerLat},${centerLng})[office=government];

    node(around:${radiusMeters},${centerLat},${centerLng})[shop=mall];
    way(around:${radiusMeters},${centerLat},${centerLng})[shop=mall];
    relation(around:${radiusMeters},${centerLat},${centerLng})[shop=mall];

    node(around:${radiusMeters},${centerLat},${centerLng})[amenity=school];
    way(around:${radiusMeters},${centerLat},${centerLng})[amenity=school];
    relation(around:${radiusMeters},${centerLat},${centerLng})[amenity=school];

    node(around:${radiusMeters},${centerLat},${centerLng})[amenity=university];
    way(around:${radiusMeters},${centerLat},${centerLng})[amenity=university];
    relation(around:${radiusMeters},${centerLat},${centerLng})[amenity=university];
  );

  out center tags;`;

  return `[out:json][timeout:60];${base}`;
};

const extractLatLon = (osmEl) => {
  // For nodes
  if (typeof osmEl.lat === "number" && typeof osmEl.lon === "number") {
    return { lat: osmEl.lat, lon: osmEl.lon };
  }

  // For ways/relations with `out center`
  if (
    osmEl.center &&
    typeof osmEl.center.lat === "number" &&
    typeof osmEl.center.lon === "number"
  ) {
    return { lat: osmEl.center.lat, lon: osmEl.center.lon };
  }

  return null;
};

export const fetchAndStoreServicesFromOverpass = async ({
  centerLat,
  centerLng,
  radiusMeters = 5000,
}) => {
  const query = buildOverpassQuery({ centerLat, centerLng, radiusMeters });

  const { data } = await axios.post(
    OVERPASS_URL,
    new URLSearchParams({ data: query }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      timeout: 120000,
    }
  );

  const elements = Array.isArray(data?.elements) ? data.elements : [];

  const services = [];
  for (const el of elements) {
    const coords = extractLatLon(el);
    if (!coords) continue;

    const service = toService({
      id: el.id,
      tags: el.tags || {},
      lat: coords.lat,
      lon: coords.lon,
    });

    if (service?.isValid()) services.push(service);
  }

  await Promise.all(
    services.map((svc) =>
      db
        .collection("services")
        .doc(String(svc.id))
        .set(svc.toFirestore(), { merge: true })
    )
  );

  return {
    imported: services.length,
    querySummary: {
      centerLat,
      centerLng,
      radiusMeters,
      categories: [
        "hospital",
        "police_station",
        "pharmacy",
        "dentist",
        "spca",
        "fire_station",
        "home_affairs",
        "mall",
        "school",
        "university",
      ],
    },
  };
};


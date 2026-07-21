/*
===============================================================

Google Maps Utilities

Purpose
-------
Centralises Google Maps URL generation used by the
administrator verification feature.

This version has been updated for the new project
architecture, which stores latitude and longitude
instead of relying on address searches.

Backward-compatible helper methods are included for
future flexibility.

===============================================================
*/

/**
 * Returns true if coordinates are valid.
 */
export function isValidCoordinates(
    latitude: number,
    longitude: number
): boolean {

    return (
        Number.isFinite(latitude) &&
        Number.isFinite(longitude)
    );

}

/**
 * Generates a normal Google Maps URL.
 *
 * Opens Google Maps in a new browser tab.
 */
export function generateGoogleMapsUrl(
    latitude: number,
    longitude: number
): string | null {

    if (!isValidCoordinates(latitude, longitude)) {

        return null;

    }

    return `https://www.google.com/maps?q=${latitude},${longitude}`;

}

/**
 * Generates an embedded Google Maps URL.
 *
 * Used by GoogleMapsModal.
 */
export function generateGoogleMapsEmbedUrl(
    latitude: number,
    longitude: number
): string | null {

    if (!isValidCoordinates(latitude, longitude)) {

        return null;

    }

    return `https://www.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;

}

/*
===============================================================
Backward Compatibility
===============================================================
*/

export const createGoogleMapsUrl =
    generateGoogleMapsUrl;

export const createGoogleMapsEmbedUrl =
    generateGoogleMapsEmbedUrl;
/*
===============================================================

ADMIN-011
Google Maps Utilities

Purpose
-------
This utility centralises all Google Maps URL generation
used by the administrator verification feature.

Keeping these functions in one place means that when
the project moves from address-based searches to
latitude/longitude coordinates, only this file needs
to change.

Future Enhancement
------------------
Once suggestion documents contain coordinates from
Firestore, replace:

generateGoogleMapsUrl(address)

with

generateGoogleMapsCoordinatesUrl(latitude, longitude)

The UI components (VerifyLocationButton,
GoogleMapsModal, AdminSuggestionCard, etc.)
will not need any changes.

===============================================================
*/

/**
 * Returns true if an address exists and is usable.
 */
export function isValidAddress(address) {
    return (
        typeof address === "string" &&
        address.trim().length > 0
    );
}

/**
 * Generates a normal Google Maps URL.
 *
 * Used by:
 * - "View in Google Maps"
 *
 * Example:
 * https://www.google.com/maps/search/?api=1&query=Cape%20Town
 */
export function generateGoogleMapsUrl(address) {
    if (!isValidAddress(address)) {
        return null;
    }

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address
    )}`;
}

/**
 * Generates a Google Maps Embed URL.
 *
 * Used by:
 * - GoogleMapsModal
 *
 * Requires:
 * VITE_GOOGLE_MAPS_API_KEY
 */
export function generateGoogleMapsEmbedUrl(address) {
    if (!isValidAddress(address)) {
        return null;
    }

    const apiKey =
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
        address
    )}`;
}

/*
===============================================================
Future Firestore Enhancement

Once suggestion documents include coordinates:

latitude
longitude

replace address searching with:

https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}

and

https://www.google.com/maps/embed/v1/place
?key=API_KEY
&q=${latitude},${longitude}

The existing components can simply call these
functions instead of the address versions.

Example implementation:

export function generateGoogleMapsCoordinatesUrl(
    latitude,
    longitude
) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

export function generateGoogleMapsCoordinatesEmbedUrl(
    latitude,
    longitude
) {
    const apiKey =
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}`;
}

===============================================================
*/
/*
=====================================================
Backward Compatibility

Older components may still import these names.

These wrappers simply call the newer functions.
=====================================================
*/

export const createGoogleMapsUrl = generateGoogleMapsUrl;

export const createGoogleMapsEmbedUrl =
    generateGoogleMapsEmbedUrl;
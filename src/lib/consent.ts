import settings from '../data/settings.json';

/** Location shown on the Contact page map. Empty = no map. */
export const mapQuery = (settings as { mapQuery?: string }).mapQuery?.trim() ?? '';

/** Everything on the site that only loads after the visitor accepts cookies. */
export const consentFeatures = [
	settings.reviewsWidgetCode?.trim()
		? { key: 'reviews', what: 'live Google reviews', provider: settings.reviewsWidgetProvider?.trim() || 'our reviews provider' }
		: null,
	mapQuery ? { key: 'map', what: 'a map of the area', provider: 'Google Maps' } : null,
].filter((f): f is { key: string; what: string; provider: string } => f !== null);

export const needsConsent = consentFeatures.length > 0;

/** "live Google reviews (JustReview) and a Google Map (Google Maps)" */
export const consentSummary = consentFeatures
	.map((f) => `${f.what} (${f.provider})`)
	.join(' and ');

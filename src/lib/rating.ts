import settings from '../data/settings.json';

/**
 * The overall Google rating and review count, fetched from the Google Places API
 * at build time (the site rebuilds daily, so it stays current).
 *
 * Needs the GOOGLE_PLACES_API_KEY environment variable (a GitHub Actions secret,
 * never committed). If the key is missing or Google can't be reached, it falls
 * back to the rating and review count typed into the site settings, so the
 * build never fails because of it.
 */
export interface Rating {
	rating: string;
	count: number;
	source: 'google' | 'settings';
}

const fallback: Rating = { rating: settings.rating, count: settings.reviewCount, source: 'settings' };

let cached: Promise<Rating> | undefined;

export function getRating(): Promise<Rating> {
	return (cached ??= fetchRating());
}

async function fetchRating(): Promise<Rating> {
	const key = process.env.GOOGLE_PLACES_API_KEY;
	if (!key) return fallback;

	try {
		const placeId = (settings as { googlePlaceId?: string }).googlePlaceId?.trim();
		const data = placeId ? await placeDetails(key, placeId) : await searchByName(key);
		if (typeof data?.rating !== 'number' || typeof data?.userRatingCount !== 'number') {
			throw new Error('No rating in response');
		}
		const result: Rating = { rating: data.rating.toFixed(1), count: data.userRatingCount, source: 'google' };
		console.log(`[rating] Google: ${result.rating} from ${result.count} reviews`);
		return result;
	} catch (err) {
		console.warn(`[rating] Couldn't get the Google rating, using site settings instead: ${(err as Error).message}`);
		return fallback;
	}
}

interface PlaceRating {
	rating?: number;
	userRatingCount?: number;
	displayName?: { text: string };
	id?: string;
}

async function placeDetails(key: string, placeId: string): Promise<PlaceRating> {
	const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
		headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount' },
		signal: AbortSignal.timeout(10_000),
	});
	if (!res.ok) throw new Error(`Google returned ${res.status}: ${(await res.text()).slice(0, 200)}`);
	return res.json();
}

/** Used when no Place ID is set: finds the business by name and location. */
async function searchByName(key: string): Promise<PlaceRating> {
	const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Goog-Api-Key': key,
			'X-Goog-FieldMask': 'places.id,places.displayName,places.rating,places.userRatingCount',
		},
		body: JSON.stringify({ textQuery: `${settings.businessName}, ${settings.location}`, regionCode: 'GB' }),
		signal: AbortSignal.timeout(10_000),
	});
	if (!res.ok) throw new Error(`Google returned ${res.status}: ${(await res.text()).slice(0, 200)}`);
	const { places = [] } = (await res.json()) as { places?: PlaceRating[] };
	const name = settings.businessName.toLowerCase();
	const match = places.find((p) => p.displayName?.text.toLowerCase().includes(name.split(' ')[0]));
	if (!match) throw new Error(`No Google listing found matching "${settings.businessName}"`);
	console.log(`[rating] Found "${match.displayName?.text}" (Place ID ${match.id}). Add this ID to the site settings to skip the search.`);
	return match;
}

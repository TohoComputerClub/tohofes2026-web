import type { PageServerLoad } from './$types';
import type { TimetableEvent } from '#lib/types/timetable.js';
import { readJsonData } from '#lib/server/data.js';

const CACHE_TTL = 30_000;
let cachedEvents: TimetableEvent[] = [];
let cachedAt = 0;

export const load: PageServerLoad = async () => {
    const now = Date.now();
    if (now - cachedAt < CACHE_TTL && cachedEvents.length > 0) {
        return { events: cachedEvents };
    }

    try {
        const events = readJsonData<TimetableEvent[]>('organization.json');

        cachedEvents = Array.isArray(events) ? events : [];
        cachedAt = now;

        return { events: cachedEvents };
    } catch (error) {
        console.error('Failed to read organization.json:', error);
        return { events: cachedEvents.length > 0 ? cachedEvents : [] };
    }
};

import { defineEnvVars } from '@sveltejs/kit/env';

// An unset location is displayed as 'Unknown Server' by the info page.
export const variables = defineEnvVars({ SERVER_LOCATION: { schema: (input) => input ?? '' } });

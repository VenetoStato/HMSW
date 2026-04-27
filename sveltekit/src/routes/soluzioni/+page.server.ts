import { getSolutions } from '$lib/catalog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const solutions = await getSolutions();
  return { solutions };
};

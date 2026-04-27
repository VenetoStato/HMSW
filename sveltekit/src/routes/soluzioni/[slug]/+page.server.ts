import type { PageServerLoad } from './$types';
import { getProducts } from '$lib/catalog';
import { SOLUTIONS, matchProductsForSolution } from '$lib/solutions';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const solution = SOLUTIONS.find((s) => s.slug === params.slug);
  if (!solution) throw error(404, 'Not found');
  const products = await getProducts();
  const matched = matchProductsForSolution(solution, products);
  return { solution, matched };
};

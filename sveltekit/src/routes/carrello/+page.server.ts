import type { PageServerLoad } from './$types';
import { getProducts } from '$lib/catalog';

export const load: PageServerLoad = async () => {
  const products = await getProducts();
  return { products };
};

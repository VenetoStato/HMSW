import { getProducts } from '$lib/catalog';

export async function load() {
  const products = await getProducts();
  return { products };
}

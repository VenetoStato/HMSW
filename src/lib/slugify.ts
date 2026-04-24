export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .normalize('NFD')
    // rimuove i diacritici dopo NFD (compatibile con TS target più vecchi)
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

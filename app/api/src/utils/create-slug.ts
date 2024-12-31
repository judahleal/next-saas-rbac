export function createSlug(text: string): string {
  const normalizedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  const slug = normalizedText
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // Remove all non-word characters except hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with a single one
    .replace(/^-+|-+$/g, '') // Trim hyphens from start and end

  return slug
}

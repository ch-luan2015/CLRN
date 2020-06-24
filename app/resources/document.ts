export async function getDocument(slug: string) {
  const url = `/static/doc/${slug}.md`;
  const content = await fetch(url);
  return content.text();
}

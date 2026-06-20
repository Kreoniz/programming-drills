export function findImports(source: string): string[] {
  const found = new Set<string>();
  const staticImport = /import\s+(?:[^'"]+?\s+from\s+)?["']([^"']+)["']/g;
  const dynamicImport = /import\(\s*["']([^"']+)["']\s*\)/g;
  for (const match of source.matchAll(staticImport)) found.add(match[1]);
  for (const match of source.matchAll(dynamicImport)) found.add(match[1]);
  return [...found].sort();
}

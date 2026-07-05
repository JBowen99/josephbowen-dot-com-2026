const META_PATTERNS = [
	/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
	/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
	/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
	/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
];

export async function getOgImage(pageUrl: string): Promise<string | null> {
	try {
		const response = await fetch(pageUrl, {
			headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0)' },
			signal: AbortSignal.timeout(8000),
		});

		if (!response.ok) return null;

		const html = await response.text();

		for (const pattern of META_PATTERNS) {
			const match = html.match(pattern);
			if (match?.[1]) return new URL(match[1], pageUrl).href;
		}
	} catch {
		return null;
	}

	return null;
}

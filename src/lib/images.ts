/**
 * Resolves Google Drive share links to a direct image URL.
 * Supports: /file/d/ID/view, ?id=ID, open?id=ID, and direct http(s) URLs.
 */
export function getDriveFileId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) return match[1];
  }

  return null;
}

export function resolveImageUrl(url: string | undefined | null): string | null {
  const trimmed = url?.trim();
  if (!trimmed) return null;

  const fileId = getDriveFileId(trimmed);
  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return null;
}

export function getImageAlt(alt: string | undefined | null, fallback: string): string {
  const trimmed = alt?.trim();
  return trimmed || fallback;
}

export function getSheetImageFields(
  raw: Record<string, string>,
  nameFallback: string
): { image: string | null; imgAlt: string } {
  const imageRaw = raw.image || raw.Image || "";
  const altRaw = raw.img_alt || raw["img_alt"] || raw["Img Alt"] || raw["Image Alt"] || "";

  return {
    image: resolveImageUrl(imageRaw),
    imgAlt: getImageAlt(altRaw, nameFallback),
  };
}

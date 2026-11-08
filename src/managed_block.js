const BEGIN_MARKER = '<!-- mr-agents:begin -->';
const END_MARKER = '<!-- mr-agents:end -->';

/**
 * Updates or inserts a managed block inside existing text.
 * Content outside the markers is strictly preserved.
 */
export function updateManagedBlock(originalText, managedContent) {
  const text = originalText || '';
  const beginIdx = text.indexOf(BEGIN_MARKER);
  const endIdx = text.indexOf(END_MARKER);

  const newBlock = `${BEGIN_MARKER}\n${managedContent.trim()}\n${END_MARKER}`;

  // If no markers exist, append cleanly
  if (beginIdx === -1 && endIdx === -1) {
    if (!text.trim()) {
      return `${newBlock}\n`;
    }
    return `${text.trimEnd()}\n\n${newBlock}\n`;
  }

  // If markers are properly matched
  if (beginIdx !== -1 && endIdx !== -1 && beginIdx < endIdx) {
    const before = text.slice(0, beginIdx).trimEnd();
    const after = text.slice(endIdx + END_MARKER.length).trimStart();
    const parts = [];
    if (before) parts.push(before);
    parts.push(newBlock);
    if (after) parts.push(after);
    return `${parts.join('\n\n')}\n`;
  }

  // Corrupted markers: repair by removing any malformed markers and re-inserting
  let cleaned = text.replaceAll(BEGIN_MARKER, '').replaceAll(END_MARKER, '').trim();
  if (cleaned) {
    return `${cleaned}\n\n${newBlock}\n`;
  }
  return `${newBlock}\n`;
}

/**
 * Removes the managed block completely from the text.
 */
export function removeManagedBlock(originalText) {
  if (!originalText) return '';
  const text = originalText;
  const beginIdx = text.indexOf(BEGIN_MARKER);
  const endIdx = text.indexOf(END_MARKER);

  if (beginIdx !== -1 && endIdx !== -1 && beginIdx < endIdx) {
    const before = text.slice(0, beginIdx).trimEnd();
    const after = text.slice(endIdx + END_MARKER.length).trimStart();
    if (before && after) return `${before}\n\n${after}\n`;
    if (before) return `${before}\n`;
    if (after) return `${after}\n`;
    return '';
  }

  return text.replaceAll(BEGIN_MARKER, '').replaceAll(END_MARKER, '').trim();
}

/**
 * Extracts current managed block content.
 */
export function extractManagedBlock(text) {
  if (!text) return null;
  const beginIdx = text.indexOf(BEGIN_MARKER);
  const endIdx = text.indexOf(END_MARKER);
  if (beginIdx !== -1 && endIdx !== -1 && beginIdx < endIdx) {
    return text.slice(beginIdx + BEGIN_MARKER.length, endIdx).trim();
  }
  return null;
}

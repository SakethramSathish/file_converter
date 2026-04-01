/**
 * ConvertX — Helper utilities
 */

/**
 * Format file size into human-readable string.
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get file extension from filename.
 */
export function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
}

/**
 * Generate a unique ID.
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Save conversion to recent history in localStorage.
 */
export function saveRecentConversion(conversion) {
  try {
    const recent = getRecentConversions();
    recent.unshift({
      ...conversion,
      timestamp: Date.now(),
    });
    // Keep only the last 10
    localStorage.setItem('convertx_recent', JSON.stringify(recent.slice(0, 10)));
  } catch (e) {
    // localStorage might be unavailable
  }
}

/**
 * Get recent conversions from localStorage.
 */
export function getRecentConversions() {
  try {
    const data = localStorage.getItem('convertx_recent');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Format a timestamp as relative time.
 */
export function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function getNameInitials(fullName?: string): string {
  if (!fullName || fullName.trim().length === 0) {
    return "GU"; // fallback initials for "Guest"
  }

  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  const initials = parts.map(name => name[0].toUpperCase()).join('');
  return initials.length > 2 ? initials.substring(0, 2) : initials;
}

export function getNameInitials(fullName: string): string {
  // Remove extra spaces and split into words
  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 1) {
    // Only one name → return first 2 letters (uppercased)
    return parts[0].substring(0, 2).toUpperCase();
  }

  // Two or more names → take first letter of each name
  const initials = parts.map(name => name[0].toUpperCase()).join('');

  // If more than 2 names → return only first 2 initials
  return initials.length > 2 ? initials.substring(0, 2) : initials;
}

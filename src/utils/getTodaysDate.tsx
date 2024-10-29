// helper function to get today's date in the right format (e.g., YYYY-MM-DD)
export function getTodayDate() {
  const today = new Date();
  return today.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

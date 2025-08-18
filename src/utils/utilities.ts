export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(date);

  const weekday = parts.find(p => p.type === "weekday")?.value || "";
  const month = parts.find(p => p.type === "month")?.value || "";
  const year = parts.find(p => p.type === "year")?.value || "";
  const hour = parts.find(p => p.type === "hour")?.value || "";
  const minute = parts.find(p => p.type === "minute")?.value || "";
  const dayPeriod = parts.find(p => p.type === "dayPeriod")?.value?.toUpperCase() || "";

  return `${weekday}, ${month} ${year} ${hour}:${minute} ${dayPeriod}`;
}

export function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
}

export function getHotelBusinessDate(): Date {
  // Force Africa/Lagos (GMT+1, no daylight savings)
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  // Extract parts
  const parts = formatter.formatToParts(new Date());
  const getPart = (type: string) => parts.find(p => p.type === type)?.value || "0";

  const year = parseInt(getPart("year"), 10);
  const month = parseInt(getPart("month"), 10) - 1; // JS months are 0-based
  const day = parseInt(getPart("day"), 10);
  const hour = parseInt(getPart("hour"), 10);

  // Construct the Africa/Lagos "now"
  let lagosNow = new Date(Date.UTC(year, month, day, hour));

  // If before 12 PM Lagos time, business date is yesterday
  if (hour < 12) {
    lagosNow.setUTCDate(lagosNow.getUTCDate() - 1);
  }

  // Normalize to 00:00:00 Lagos time
  lagosNow.setUTCHours(0, 0, 0, 0);

  return lagosNow;
}
export function formatDate({ date, locale = "en-US" }: { date: Date; locale?: string }): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

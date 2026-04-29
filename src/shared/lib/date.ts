const MONTH_SHORT = [
  "січ",
  "лют",
  "бер",
  "квіт",
  "трав",
  "черв",
  "лип",
  "серп",
  "вер",
  "жовт",
  "лист",
  "груд",
];

const MONTH_LONG = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];

export function formatDateParts(dateValue: string) {
  const date = new Date(`${dateValue}T00:00:00`);
  const monthIndex = Number.isNaN(date.getTime()) ? 0 : date.getMonth();

  return {
    iso: dateValue,
    year: Number.isNaN(date.getTime()) ? "" : String(date.getFullYear()),
    day: Number.isNaN(date.getTime())
      ? ""
      : String(date.getDate()).padStart(2, "0"),
    monthShort: MONTH_SHORT[monthIndex],
    monthLong: MONTH_LONG[monthIndex],
  };
}

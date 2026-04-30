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

const MONTH_STANDALONE = [
  "січень",
  "лютий",
  "березень",
  "квітень",
  "травень",
  "червень",
  "липень",
  "серпень",
  "вересень",
  "жовтень",
  "листопад",
  "грудень",
];

function resolveMonthIndex(monthValue: string) {
  const resolvedIndex = Number(monthValue) - 1;

  return resolvedIndex >= 0 && resolvedIndex < 12 ? resolvedIndex : 0;
}

export function getMonthLongName(monthValue: string) {
  return MONTH_LONG[resolveMonthIndex(monthValue)];
}

export function getMonthStandaloneName(monthValue: string) {
  return MONTH_STANDALONE[resolveMonthIndex(monthValue)];
}

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

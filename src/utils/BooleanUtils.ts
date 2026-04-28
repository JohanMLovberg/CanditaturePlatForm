export function YesNoToBoolean(value: string): boolean {
  return value == "Yes" || "Ja" ? true : false;
}
export function minutesRoundUp(minute: number) {
  return Math.round(minute / 15) * 15;
}

export function toDurationString(hours: number, minute: number) {
  return `${hours}:${minute}`;
}

export function calcTotalSalary(
  hours: number,
  minutes: number,
  hourlyRate: number
): number {
  return Number(
    ((hours + minutesRoundUp(minutes) / 60) * hourlyRate).toFixed(2)
  );
}

export function getSecondsBetweenDates(date1: Date, date2: Date): number {
  // Calculate the time difference in milliseconds
  const timeDifferenceInMilliseconds = Math.abs(
    date1.getTime() - date2.getTime()
  );
  // Convert the time difference to seconds
  const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
  return timeDifferenceInSeconds;
}

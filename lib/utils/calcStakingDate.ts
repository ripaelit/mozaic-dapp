export const calcStakingDate = (
  range: any
): { months: number; weeks: number; days: number; unlockDate: any } => {
  const currentDate: any = new Date();
  let targetDate: any;
  switch (range) {
    case '1m':
      targetDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds()
      );
      break;
    case '3m':
      targetDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 3,
        currentDate.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds()
      );
      break;
    case '6m':
      targetDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 6,
        currentDate.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds()
      );
      break;
    case '1y':
      targetDate = new Date(
        currentDate.getFullYear() + 1,
        currentDate.getMonth(),
        currentDate.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds()
      );
      break;
    case '2y':
      targetDate = new Date(
        currentDate.getFullYear() + 2,
        currentDate.getMonth(),
        currentDate.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds()
      );
      break;
    case '3y':
      targetDate = new Date(
        currentDate.getFullYear() + 3,
        currentDate.getMonth(),
        currentDate.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds()
      );
      break;
    default:
      if (!isNaN(range)) {
        targetDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1 * parseInt(range),
          currentDate.getDate(),
          currentDate.getHours(),
          currentDate.getMinutes(),
          currentDate.getSeconds()
        );
      } else {
        return {
          months: 0,
          weeks: 0,
          days: 0,
          unlockDate: 'Invalid input',
        };
      }
  }

  const diffInMilliseconds = targetDate - currentDate;
  const diffInMonths = Math.round(diffInMilliseconds / (1000 * 3600 * 24 * 30));
  const diffInWeeks = Math.round(diffInMilliseconds / (1000 * 3600 * 24 * 7));
  const diffInDays = Math.round(diffInMilliseconds / (1000 * 3600 * 24));

  return {
    months: diffInMonths,
    weeks: diffInWeeks,
    days: diffInDays,
    unlockDate: targetDate.getTime(),
  };
};

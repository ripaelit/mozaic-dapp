export const calcStakingDate = (range: any): { weeks: number; days: number; unlockDate: any } => {
  const currentDate: any = new Date();
  let targetDate: any;
  switch (range) {
    case '1w':
      targetDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 7,
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds()
      );
      break;
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
          currentDate.getMonth(),
          currentDate.getDate() + 7 * parseInt(range),
          currentDate.getHours(),
          currentDate.getMinutes(),
          currentDate.getSeconds()
        );
      } else {
        return {
          weeks: 0,
          days: 0,
          unlockDate: 'Invalid input',
        };
      }
  }
  const diffInMilliseconds = targetDate - currentDate;
  const diffInWeeks = Math.round(diffInMilliseconds / (1000 * 3600 * 24 * 7));
  const diffInDays = Math.round(diffInMilliseconds / (1000 * 3600 * 24));

  return {
    weeks: diffInWeeks,
    days: diffInDays,
    unlockDate: targetDate.getTime(),
  };
};

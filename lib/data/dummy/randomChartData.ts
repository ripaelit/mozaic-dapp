export const generateChart = (count: number, interval: number, startFrom?: number) => {
  let arr: any = [];
  const timeGap = interval * 3.6e6;
  let time = startFrom ? startFrom : new Date().getTime() - timeGap * (count - 2);
  for (let i = 0; i < count; i++) {
    const val = parseInt(Math.round(Math.random() * 100).toFixed(2));
    const item = [time, val];
    arr.push(item);
    time = time + timeGap;
  }

  return arr;
};

const arr = generateChart(300, 3);

const arr2 = arr.map((data: any) => [
  data[0],
  parseInt(Math.round(Math.random() * 100).toFixed(2)),
]);

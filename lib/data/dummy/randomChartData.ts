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

const arr = generateChart(8000, 1);

export const chartData1 = arr.map((data: any) => [
  data[0],

  Math.floor(Math.random() * (20 - 5 + 1)) + 5,
]);

export const chartData2 = arr.map((data: any) => [
  data[0],

  Math.floor(Math.random() * (20 - 5 + 1)) + 5,
]);

export const chartData3 = arr.map((data: any) => [
  data[0],

  Math.floor(Math.random() * (20 - 5 + 1)) + 5,
]);

export const chartData4 = arr.map((data: any) => [
  data[0],

  Math.floor(Math.random() * (20 - 5 + 1)) + 5,
]);

// console.log(arr2);

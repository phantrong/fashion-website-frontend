const convertNumberToMoney = (money: number) => {
  const million = money / 1000000;
  const millionString = million.toFixed(1).toString();
  if (millionString.endsWith('.0')) {
    return millionString.slice(0, -2);
  }
  return millionString;
};

function calculateDaysToTargetDate(targetDateString: string) {
  const targetDate = new Date(targetDateString);
  const currentDate = new Date();
  const timeDiff = targetDate.getTime() - currentDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
}

export { convertNumberToMoney, calculateDaysToTargetDate };

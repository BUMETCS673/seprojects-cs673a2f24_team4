export const getDaysInMonth = (month: number, year: number) => {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
};

export const getDaysInCurrentMonth = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const date = new Date(year, month + 1, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(`${monthName} ${i}`);
  }

  return days;
};

export const getLast7Days = () => {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayDate = date.getDate();
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });

    days.push(`${dayName}, ${monthName} ${dayDate}`);
  }

  return days;
};

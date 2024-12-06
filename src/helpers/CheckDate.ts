export function checkDate(date: Date | string) {
  const today = new Date(); // Создаем объект Date для текущей даты и времени
  const otherDate = new Date(date); // Пример другой даты
  return (
    today.getFullYear() === otherDate.getFullYear() &&
    today.getMonth() === otherDate.getMonth() &&
    today.getDate() === otherDate.getDate()
  );
}

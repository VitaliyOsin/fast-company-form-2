const months = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];
const transtime = (ms) => {
  const dif = Date.now() - ms;
  const d = new Date(ms);
  const dn = new Date(Date.now());
  if (dif <= 60000) {
    return "1 минуту назад";
  } else if (dif > 60000 && dif <= 300000) {
    return "5 минут назад";
  } else if (dif > 300000 && dif <= 600000) {
    return "10 минут назад";
  } else if (dif > 600000 && dif <= 1800000) {
    return "30 минут назад";
  } else if (dif > 1800000 && dif <= 86400000) {
    return `${d.getHours}:${d.getMinutes}`;
  } else if (
    d.getFullYear() === dn.getFullYear() &&
    d.getMonth() === dn.getMonth() &&
    d.getDate() === dn.getDate()
  ) {
    return `${d.getDate()} ${months[d.getMonth()]}`;
  } else {
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }
};

export default transtime;

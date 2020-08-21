const SI_MS_IN_YEAR = 31_556_925_000;
const SI_MS_IN_MONTH = SI_MS_IN_YEAR / 12.0;
const SI_MS_IN_DAY = SI_MS_IN_MONTH / 30.0;
const SI_MS_IN_HOUR = SI_MS_IN_DAY / 24.0;
const SI_MS_IN_MINUTE = SI_MS_IN_HOUR / 60.0;
const SI_MS_IN_SECOND = SI_MS_IN_MINUTE / 60.0;

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function replaceCurrentTime() {
  const si_ms_since_epoch = new Date().getTime();

  document.getElementsByTagName(
    'body'
  )[0].innerHTML = `<p class="current-date">${dateString(
    si_ms_since_epoch
  )}</p><p class="current-time">${timeString(si_ms_since_epoch)}</p>`;
}

function dateString(si_ms_since_epoch) {
  const year = Math.floor(1970 + si_ms_since_epoch / SI_MS_IN_YEAR);
  const month =
    MONTHS[Math.floor((si_ms_since_epoch % SI_MS_IN_YEAR) / SI_MS_IN_MONTH)];
  const day =
    Math.floor((si_ms_since_epoch % SI_MS_IN_MONTH) / SI_MS_IN_DAY) + 1;

  const weekday = WEEKDAYS[day % 6];

  return `${weekday} ${month} ${day}, ${year}`;
}

function timeString(si_ms_since_epoch) {
  const hour = Math.floor((si_ms_since_epoch % SI_MS_IN_DAY) / SI_MS_IN_HOUR);
  const minute = Math.floor(
    (si_ms_since_epoch % SI_MS_IN_HOUR) / SI_MS_IN_MINUTE
  );
  const second = Math.floor(
    (si_ms_since_epoch % SI_MS_IN_MINUTE) / SI_MS_IN_SECOND
  );

  const am_pm = hour >= 12 ? 'pm' : 'am';

  return `${pad(hour % 12)}:${pad(minute)}:${pad(second)} ${am_pm}`;
}

function year() {
  Math.floor(1970 + si_ms_since_epoch / SI_MS_IN_YEAR);
}

function month() {
  ((si_ms_since_epoch % SI_MS_IN_YEAR) / SI_MS_IN_MONTH).floor + 1;
}

function day() {
  ((si_ms_since_epoch % SI_MS_IN_MONTH) / SI_MS_IN_DAY).floor + 1;
}

function weekday() {
  day % 6;
}

function hour() {
  ((si_ms_since_epoch % SI_MS_IN_DAY) / SI_MS_IN_HOUR).floor;
}

function minute() {
  ((si_ms_since_epoch % SI_MS_IN_HOUR) / SI_MS_IN_MINUTE).floor;
}

function second() {
  ((si_ms_since_epoch % SI_MS_IN_MINUTE) / SI_MS_IN_SECOND).floor;
}

function pad(number) {
  return number.toString().padStart(2, '0');
}

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

  document.getElementById(
    'date-and-time-container'
  ).innerHTML = `<p class="current-date">${dateString(
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

function hour(si_ms_since_epoch) {
  return Math.floor((si_ms_since_epoch % SI_MS_IN_DAY) / SI_MS_IN_HOUR);
}

function minute(si_ms_since_epoch) {
  return Math.floor((si_ms_since_epoch % SI_MS_IN_HOUR) / SI_MS_IN_MINUTE);
}

function second(si_ms_since_epoch) {
  return Math.floor((si_ms_since_epoch % SI_MS_IN_MINUTE) / SI_MS_IN_SECOND);
}

function pad(number) {
  return number.toString().padStart(2, '0');
}

function initClocks() {
  const si_ms_since_epoch = new Date().getTime();

  // Create an object with each hand and it's angle in degrees
  var hands = [
    {
      hand: 'hours',
      angle: hour(si_ms_since_epoch) * 30 + minute(si_ms_since_epoch) / 2,
    },
    {
      hand: 'minutes',
      angle: minute(si_ms_since_epoch) * 6,
    },
    {
      hand: 'seconds',
      angle: second(si_ms_since_epoch) * 6,
    },
  ];
  // Loop through each of these hands to set their angle
  for (var j = 0; j < hands.length; j++) {
    var elements = document.querySelectorAll('.' + hands[j].hand);
    for (var k = 0; k < elements.length; k++) {
      elements[k].style.webkitTransform = 'rotateZ(' + hands[j].angle + 'deg)';
      elements[k].style.transform = 'rotateZ(' + hands[j].angle + 'deg)';
      // If this is a minute hand, note the seconds position (to calculate minute position later)
      if (hands[j].hand === 'minutes') {
        elements[k].parentNode.setAttribute(
          'data-second-angle',
          hands[j + 1].angle
        );
      }
    }
  }
}

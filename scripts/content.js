// if (typeof init === 'undefined') {
//   const init = function () {
//     console.log('RUN POPUP');
//     let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
//     let timerRef = document.querySelector('.timerDisplay');
//     let int = 0;

//     int = setInterval(displayTimer, 10);

//     function displayTimer() {
//       milliseconds += 10;
//       if (milliseconds == 1000) {
//         milliseconds = 0;
//         seconds++;
//         if (seconds == 60) {
//           seconds = 0;
//           minutes++;
//           if (minutes == 60) {
//             minutes = 0;
//             hours++;
//           }
//         }
//       }
//       let h = hours < 10 ? '0' + hours : hours;
//       let m = minutes < 10 ? '0' + minutes : minutes;
//       let s = seconds < 10 ? '0' + seconds : seconds;
//       //  let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
//       timerRef.textContent = `${h}h : ${m}m : ${s}s`;
//     }
//   };
//   init();
// }
let timerRef = document.querySelector('.timerDisplay');
let [hours, minutes, seconds] = [0, 0, 0];

chrome.runtime.sendMessage({
  message: 'update_timer',
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'update_timer_content') {
    console.log('time', request.time);
    // displayTimer(request.time);
    displayTimer(request.time);
  }
});

document.getElementById('resetTimer').addEventListener('click', () => {
  chrome.runtime.sendMessage({
    message: 'reset_timer',
  });
});

function displayTimer(milliseconds) {
  console.log(hours, minutes);
  seconds = milliseconds / 1000;
  if (seconds > 60) {
    minutes = seconds / 60;
    seconds = seconds - 60 * Math.floor(minutes);
    if (minutes > 60) {
      hours = minutes / 60;
      minutes = minutes - 60 * Math.floor(hours);
    }
  }
  console.log(hours, minutes);

  (hours = Math.floor(hours)),
    (minutes = Math.floor(minutes)),
    (seconds = Math.floor(seconds));

  let h = hours < 10 ? '0' + hours : hours;
  let m = minutes < 10 ? '0' + minutes : minutes;
  let s = seconds < 10 ? '0' + seconds : seconds;

  h < 1 ? (h = '00') : h;
  m < 1 ? (m = '00') : m;

  timerRef.textContent = `${h}h : ${m}m : ${s}s`;
  // return hours, minutes, seconds;
}

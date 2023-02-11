// if (typeof init === 'undefined') {
//   const init = function () {
//     console.log('RUN POPUP');
//     let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
//     let timerRef = document.querySelector('.timerDisplay');
//     let int = 0;

//     int = setInterval(displayTimer, 10);

//     document.getElementById('resetTimer').addEventListener('click', () => {
//       clearInterval(int); // Stops the timer
//       [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0]; // reinitalizes the elements created
//       timerRef.textContent = '00h : 00m : 00s'; // sets the timer back to 0
//       int = setInterval(displayTimer, 10);
//     });

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

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.type === 'get_timer') {
//     var currentTime = new Date().getTime();
//     var elapsedTime = currentTime - startTime;
//     sendResponse({ elapsedTime: elapsedTime });
//   }
// });

let viewTime;

chrome.runtime.sendMessage({
  message: 'update_timer',
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'update_timer_content') {
    console.log('time', request.time);
    viewTime = request.time; //Gets the time in milliseconds
  }
});

// if (typeof init === 'undefined') {
//   const init = function () {
//   };
//   init();
// }
displayTimer(77777777);

function displayTimer(milliseconds) {
  let hours,
    minutes,
    seconds,
    hourRem,
    minutesRem,
    secondsRem = [0, 0, 0, 0, 0, 0];
  seconds = milliseconds / 1000;
  secondsRem = milliseconds % 1000;
  if (seconds > 60) {
    minutes = seconds / 60;
    seconds = seconds - 60 * Math.floor(minutes);
    if (minutes > 60) {
      hours = minutes / 60;
      minutes = minutes - 60 * Math.floor(hours);
    }
  }
  console.log('hours', hours, minutes, seconds, secondsRem);
}

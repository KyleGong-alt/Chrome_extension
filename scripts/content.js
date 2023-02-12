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
let [hours, minutes, seconds, millisec] = [0, 0, 0, 0];
let intervalID;

chrome.runtime.sendMessage({
  message: 'update_timer',
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'update_timer_content') {
    // displayTimer(request.start_timer);

    console.log('request.time');
    displayTimer(request.time);
  } else if (request.message === 'reset_timer_content') {
    clearInterval(intervalID);
    displayTimer(0);
  }
  // else if (request.message === 'start_timer_content') {
  //   displayTimer(request.time);
  // } else if (request.message === 'pause_timer_content') {
  //   clearInterval(intervalID);
  // }
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  let startTime = sessionStorage.getItem(activeInfo.tabId);
  console.log(startTime);
  let difference = Date.now() - startTime;
  console.log('time elapsed', difference);
});

// document.getElementById('startTimer').addEventListener('click', () => {
//   chrome.runtime.sendMessage({
//     message: 'start_timer',
//   });
// });

// document.getElementById('pauseTimer').addEventListener('click', () => {
//   chrome.runtime.sendMessage({
//     message: 'pause_timer',
//   });
// });

document.getElementById('resetTimer').addEventListener('click', () => {
  chrome.runtime.sendMessage({
    message: 'reset_timer',
  });
});

function displayTimer(milliseconds) {
  let copy_of_mil = milliseconds;

  intervalID = setInterval(() => {
    seconds = copy_of_mil / 1000;
    if (seconds > 60) {
      minutes = seconds / 60;
      seconds = seconds - 60 * Math.floor(minutes);
      if (minutes > 60) {
        hours = minutes / 60;
        minutes = minutes - 60 * Math.floor(hours);
      }
    }
    // console.log(hours, minutes);

    (hours = Math.floor(hours)),
      (minutes = Math.floor(minutes)),
      (seconds = Math.floor(seconds));

    let h = hours < 10 ? '0' + hours : hours;
    let m = minutes < 10 ? '0' + minutes : minutes;
    let s = seconds < 10 ? '0' + seconds : seconds;

    console.log(h, m, s);
    timerRef.textContent = `${h}h : ${m}m : ${s}s`;
    copy_of_mil += 10;
  }, 10);
}

// function iterateTimer(millisecond) {
//   // let [hours, minutes, seconds] = [0, 0, 0];
//   // let timerRef = document.querySelector('.timerDisplay');

//   setInterval(() => {
//     millisecond += 10;
//     if (millisecond == 1000) {
//       millisecond = 0;
//       seconds++;
//       if (seconds == 60) {
//         seconds = 0;
//         minutes++;
//         if (minutes == 60) {
//           minutes = 0;
//           hours++;
//         }
//       }
//     }
//     let h = hours < 10 ? '0' + hours : hours;
//     let m = minutes < 10 ? '0' + minutes : minutes;
//     let s = seconds < 10 ? '0' + seconds : seconds;
//     //  let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
//     timerRef.textContent = `${h}h : ${m}m : ${s}s`;
//   }, 10);
// }

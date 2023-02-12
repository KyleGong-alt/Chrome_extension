let start_timer;
let difference;
let end_timer;
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    start_timer = Date.now();
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    files: ['scripts/content.js'],
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'update_timer') {
    end_timer = Date.now();
    difference = end_timer - start_timer;
    chrome.runtime.sendMessage({
      message: 'update_timer_content',
      time: difference,
    });
  }

  if (request.message === 'reset_timer') {
    start_timer = Date.now();
    end_timer = Date.now();
    difference = end_timer - start_timer;
    chrome.runtime.sendMessage({
      message: 'reset_timer_content',
      time: difference,
    });
  }

  // if (request.message === 'start_timer') {
  //   chrome.runtime.sendMessage({
  //     message: 'start_timer_content',
  //   });
  // }

  // if (request.message === 'pause_timer') {
  //   chrome.runtime.sendMessage({
  //     message: 'pause_timer_content',
  //   });
  // }
});

// chrome.action.onClicked.addListener(async (tab) => {
//   console.log('please');
//   await chrome.runtime.sendMessage({
//     message: 'update_timer',
//   });
// });

// chrome.runtime.onMessage.addListener(function (request, sender, sendResposne) {
//   console.log(request);
//   if (request.action === 'browser_action') {
//     console.log('icon has been clicked');
//   }
// });

// chrome.runtime.sendMessage({
//   message: 'update_timer',
// });
// console.log('update_timer');

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   // console.log(request);
//   // console.log('request.time', request.time);
//   if (request.message === 'update_timer') {
//     let new_time = Date.now();
//     let difference = request.time - new_time;
//     console.log('Difference in time', difference);
//     // Update the elapsed time in the content script
//   }
// });

// console.log('sent message');

// }
// bool = 0;

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(request.message);
//   if (request.message === 'start_timer') {
//     console.log('Received start_timer message');
//     // Start the timer and send the elapsed time to the content script
//     setInterval(() => {
//       let elapsedTime = Date.now();
//       chrome.runtime.sendMessage({
//         message: 'update_time',
//         time: elapsedTime,
//       });
//     }, 1000);
//     console.log('sent update_time');
//   }
// });

// try {
//   chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     if (changeInfo.status === 'complete') {
//       console.log('start the timer');
//       chrome.tabs.executeScript({
//         file: 'scripts/popup.js',
//         runAt: 'document_end',
//         allFrames: false,
//       });
//     }
//   });
// } catch (e) {
//   console.log(e);
// }

// try {
//   chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     if (changeInfo.status === 'complete') {
//       // get the current time
//       var currentTime = new Date().getTime();
//       // send the current time to the content script
//       console.log('sending message', tabId, changeInfo, tab);
//       chrome.tabs.sendMessage(tab.id, {
//         type: 'start_timer',
//         time: currentTime,
//       });
//     }
//   });

//   // chrome.browserAction.onClicked.addListener(function (tab) {
//   //   chrome.tabs.sendMessage(tab.id, { type: 'get_timer' }, function (response) {
//   //     // update the popup window with the elapsed time
//   //     console.log('Elapsed time: ' + response.elapsedTime);
//   //   });
//   // });
// } catch (e) {
//   console.log(e);
// }
// let bool = 0;

let start_timer;
let difference;
let now_timer;
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
    now_timer = Date.now();
    difference = now_timer - start_timer;
    chrome.runtime.sendMessage({
      message: 'update_timer_content',
      time: difference,
    });
  }

  if (request.message === 'reset_timer') {
    now_timer = Date.now();
    start_timer = Date.now();
    chrome.runtime.sendMessage({
      message: 'update_timer_content',
      time: 0,
    });
  }
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

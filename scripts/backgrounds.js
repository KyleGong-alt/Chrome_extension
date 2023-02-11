console.log('?');
try {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      console.log('start the timer');
      chrome.tabs.executeScript({
        file: 'scripts/popup.js',
        runAt: 'document_end',
        allFrames: false,
      });
    }
    // console.log(tabId, tab, changeInfo);
    // chrome.scripting.executeScript({
    //   files: ['scripts/popup.js'],
    //   target: { tabId: tab.id },
    // });
  });
} catch (e) {
  console.log(e);
}

//   chrome.runtime.sendMessage({
//     msg: "start-timer",
//     data: {
//         subject: "Loading",
//         content: "Just completed!"
//     }
// });

try{

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "start-timer") {
      // Start the timer
      chrome.scripting.executeScript({
        files: ['scripts/popup.js'],
        target: {tabId: tab.id}
      })
      chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        console.log("TAB UPDATED");
        console.log(tab.url);
      });
    }
  });

}catch(e) {
    console.log(e);
}

//   chrome.runtime.sendMessage({
//     msg: "start-timer", 
//     data: {
//         subject: "Loading",
//         content: "Just completed!"
//     }
// });
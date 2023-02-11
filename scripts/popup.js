
if (typeof init == "undefined") {
    const init = function() {
        createTimer();
    }
    init();
}



// document.getElementById('startTimer').addEventListener('click', ()=>{
//     if(int!==null){ // Makes it so the timer doesn't start automatically
//         clearInterval(int);
//     }
//     setTheInterval();
// });




// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.type === "start-timer") {
//         setTheInterval();

//       // Start the timer
//       chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//         console.log("TAB UPDATED");
//         console.log(tab.url);
//       });
//     }
//   });

// document.getElementById('pauseTimer').addEventListener('click', ()=>{
//     clearInterval(int); // stops the intervals from begin called over and over
// });




function createTimer() {
    let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
    let timerRef = document.querySelector('.timerDisplay');
    let int = 0;

    setTheInterval(timerRef, milliseconds, seconds, minutes, hours);
    
    document.getElementById('resetTimer').addEventListener('click', ()=>{
        clearInterval(int); // Stops the timer
        [milliseconds,seconds,minutes,hours] = [0,0,0,0]; // reinitalizes the elements created
        timerRef.textContent = '00h : 00m : 00s'; // sets the timer back to 0
        setTheInterval(timerRef, milliseconds, seconds, minutes, hours);
    });
    
}


function setTheInterval(timerRef, milliseconds, seconds, minutes, hours){
    int = setInterval(displayTimer(timerRef, milliseconds, seconds, minutes, hours),10);
}


function displayTimer(timerRef, milliseconds, seconds, minutes, hours){
    milliseconds+=10; 
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }
    }
 let h = hours < 10 ? "0" + hours : hours;
 let m = minutes < 10 ? "0" + minutes : minutes;
 let s = seconds < 10 ? "0" + seconds : seconds;
//  let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
 timerRef.textContent = `${h}h : ${m}m : ${s}s`;  
//  timerRef.innerHTML = `${h}h : ${m}m : ${s}s : ${ms}ms`;
}






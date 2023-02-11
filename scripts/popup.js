if (typeof init === 'undefined') {
  const init = function () {
    console.log('RUN POPUP');
    let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    let timerRef = document.querySelector('.timerDisplay');
    let int = 0;

    int = setInterval(displayTimer, 10);

    document.getElementById('resetTimer').addEventListener('click', () => {
      clearInterval(int); // Stops the timer
      [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0]; // reinitalizes the elements created
      timerRef.textContent = '00h : 00m : 00s'; // sets the timer back to 0
      int = setInterval(displayTimer, 10);
    });

    function displayTimer() {
      milliseconds += 10;
      if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
          seconds = 0;
          minutes++;
          if (minutes == 60) {
            minutes = 0;
            hours++;
          }
        }
      }
      let h = hours < 10 ? '0' + hours : hours;
      let m = minutes < 10 ? '0' + minutes : minutes;
      let s = seconds < 10 ? '0' + seconds : seconds;
      //  let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
      timerRef.textContent = `${h}h : ${m}m : ${s}s`;
    }
  };
  init();
}

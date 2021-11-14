let circle = document.querySelector('svg circle');
let toggle = document.querySelector('.icon');
let timer = document.querySelector('#time');

let length = circle.getTotalLength() + 1;
circle.style.strokeDasharray = `${length}px`;

let start = false;
let time = timer.value;
let currentLength;
let timeChange = parseFloat(time).toFixed(2);
let offsetPercentage;

let timeOutID;
let intervalID;
let offsetIntervalID;
let addOffset = 0.01 * length;
let offset = 0;

toggle.addEventListener('click', () => {
    if (!start) {
      start = true;
      timeOutID = setTimeout(timeOut, parseFloat(timer.value) * 1000);
      intervalID = setInterval(interval, 10);
      offsetIntervalID = setInterval(offsetInterval, parseFloat(time) * 1000 * 0.01);
    } else {
      clearAll()
    }
  });
  
timer.addEventListener('input', function () {
    time = timer.value
    timeChange = parseFloat(time).toFixed(2)
    reset()
    this.focus()
    if(start) {
        toggle.click()
    }
});  

function clearAll() {
    start = false;
    clearInterval(intervalID);
    clearInterval(offsetIntervalID);
    clearTimeout(timeOutID);
}

function reset() {
    circle.style.transition = ``;
    circle.style.strokeDashoffset = `0px`;
    offset = 0;
    timer.value = time;
    timeChange = time;
}


let timeOut = () => {
    circle.style.transition = ``;
    circle.style.strokeDashoffset = `0px`;
    offset = 0;
    timer.value = time;
    timeChange = time;
    clearInterval(intervalID);
    clearInterval(offsetIntervalID);
    toggle.click()
};

let interval = () => {
    timeChange = timeChange - 0.01;
    timer.value = timeChange.toFixed(2);
};

let offsetInterval = () => {
    offset += addOffset;
    circle.style.strokeDashoffset = '-'+offset+'px';
    circle.style.transition = `stroke-dashoffset ${0.01*time}s linear`;
};
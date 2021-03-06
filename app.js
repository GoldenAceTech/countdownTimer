let circle = document.querySelector('svg circle');
let toggle = document.querySelector('.icon');
let timer = document.querySelector('#time');

let length = circle.getTotalLength() + 1;

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
        stopTimer()
    }
  });
  
timer.addEventListener('input', function () {
    time = timer.value
    timeChange = parseFloat(time).toFixed(2)
    reset()
    if(start) {
        toggle.click()
    }
    this.focus()
});  

function stopTimer() {
    start = false;
    clearInterval(intervalID);
    clearInterval(offsetIntervalID);
    clearTimeout(timeOutID);
    if(offset < length/2) {circle.classList.remove('half','danger')}
}

function reset() {
    circle.style.transition = ``;
    circle.style.strokeDashoffset = `0px`;
    offset = 0;
    timer.value = time;
    timeChange = time;
    circle.classList.remove('half','danger')
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
    if(offset >= length/2) {
        circle.classList.add('half')
    }
    if(offset > ((3/4)*length)) {
        circle.classList.add('danger')
        circle.classList.remove('half')
    }

    if(offset >= length) {
        circle.classList.remove('half','danger')
        stopTimer()
        reset()
    }

    circle.style.strokeDasharray = `${length}`;
    circle.style.strokeDashoffset = -offset;
    circle.style.transition = `stroke-dashoffset ${0.01*time}s linear`;
};
const opt1 = document.getElementById("option1");
const opt2 = document.getElementById("option2");
const opt3 = document.getElementById("option3");
const timePera = document.getElementById("time");
const setBtn = document.getElementById("setBtn");
const clearBtn = document.getElementById("clearBtn");
const notifyPera = document.getElementById("notify");

// made time pera starts
let defaultPera = `Alarm has not been set yet!`;
notifyPera.innerHTML = defaultPera;
var audio = new Audio("music/1.mp3");

let setTime;

setInterval(() => {
  let ampm = "";
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let second = today.getSeconds();

  //   for setting the AM/PM in the running clock
  if (hour <= 12) {
    ampm = "AM";
  } else {
    ampm = "PM";
  }

  // for making the clock run for only 12 hours
  if (hour > 12) {
    hour = hour - 12;
  }

  let zero1 = hour < 10 ? "0" : "";
  let zero2 = min < 10 ? "0" : "";
  let zero3 = second < 10 ? "0" : "";

  hour = zero1 + hour;
  min = zero2 + min;
  second = zero3 + second;

  let time = `${hour}:${min}:${second} ${ampm}`;

  timePera.innerHTML = `${time}`;

  if (time == setTime) {
    if (typeof audio.loop == "boolean") {
      audio.loop = true;
    } else {
      myAudio.addEventListener(
        "ended",
        function () {
          this.currentTime = 0;
          this.play();
        },
        false
      );
    }
    audio.play();
  }
}, 1000);

// made time pera ends

// made options start

let arr1 = [`<option value="Hour" selected hidden>Hour</option>`];
let arr2 = [`<option value="Minutes" selected hidden>Minutes</option>`];
let arr3 = [
  `<option value="AM/PM" selected hidden>AM/PM</option>`,
  `<option>AM</option>`,
  `<option>PM</option>`,
];

for (let i = 1; i < 13; i++) {
  let zero = i < 10 ? "0" : "";
  let opt1 = `<option class="subOption">${zero + i}</option>`;
  arr1.push(opt1);
}

for (let i = 1; i < 61; i++) {
  let zero = i < 10 ? "0" : "";
  let opt2 = `<option class="subOption">${zero + i}</option>`;
  arr2.push(opt2);
}

function makeOptDefault() {
  opt1.innerHTML = arr1;
  opt2.innerHTML = arr2;
  opt3.innerHTML = arr3;
}
makeOptDefault();

setBtn.addEventListener("click", (e) => {
  e.preventDefault();
  setTime = `${opt1.value}:${opt2.value}:00 ${opt3.value}`;

  if (
    opt1.value === "Hour" ||
    opt2.value === "Minutes" ||
    opt3.value === "AM/PM"
  ) {
    alert(`Please fill all the options first!`);
    notifyPera.innerHTML = defaultPera;
  } else {
    notifyPera.innerHTML = `Your Alarm has been set for<br> <b>${setTime}</b>`;
    clearBtn.classList.remove("hidden");
    setBtn.classList.add("hidden");
  }
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  setTime = "";
  notifyPera.innerHTML = defaultPera;
  clearBtn.classList.add("hidden");
  setBtn.classList.remove("hidden");
  audio.pause();
  audio.currentTime = 0;
  makeOptDefault();
});

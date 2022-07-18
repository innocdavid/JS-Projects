const selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");

let alarmTime, 
isAlarmSet = false,
rington = new Audio('./ringtons/ring2-mp3-6551.mp3');

for(let i = 12; i > 0; i--) {
  i = i < 10 ? '0' + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 59; i >= 0; i--) {
  i = i < 10 ? '0' + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 2; i > 0; i--) {
  let amp = i === 1 ? "AM" : "PM";
  let option = `<option value="${amp}">${amp}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  //getting hour, minute and second
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  amp = 'AM';

  if (hour >= 12) {
    hour = hour - 12;
    amp = 'PM';
  }

  // if hour is 0 setting the value to 12
  hour == 0 ? hour = 12 : hour;

  // adding 0 before value less than 10
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;

  currentTime.innerHTML = `${hour}:${minute}:${second} ${amp}`;
  if (alarmTime == `${hour}:${minute} ${amp}`) {
    rington.play();
    rington.loop = true;
  };
}, 1000);

let setAlarm = () => {
  if (isAlarmSet) {
    alarmTime = "";
    rington.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerHTML = "Set Alarm";
    return isAlarmSet = false;
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  if (time.includes('Hour') || time.includes('Minute') || time.includes('AM/PM')) {
    return alert("Please select a valid time to set alarm!");
  }
  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disable");
  setAlarmBtn.innerHTML = "Clear Alarm";
};

setAlarmBtn.addEventListener('click', setAlarm);
let cardData = null;
function Start() {
  // :: Get Data
  GetDataTable().then((data) => {
    // :: Open Card
    cardData = data;
    card = GetRandomCard(cardData);
    OpenCard(card);
    SetAudio(card.voice_ids);
  });
}

// >> Data Table
function GetDataTable() {
  return fetch("./Data/data_table.json")
    .then((response) => response.json())
    .then((data) => data);
}

// >> Play Audio
let audio = document.getElementById("audio");
function SetAudio(_audio) {
  const src = "./Voice/" + _audio + ".wav";
  audio.src = src;
}
function PlayAudio() {
  audio.play();
}
function StopAudio() {
  audio.pause();
  audio.currentTime = 0;
}
function PlaySE() {
  document.getElementById("se").play();
}

// >> Card
function GetRandomCard(_data) {
  return _data[Math.floor(Math.random() * _data.length)];
}
function SetCardRandomColor() {
  // :: Set Random Soft Color
  const colorR = Math.floor(Math.random() * 56) + 200;
  const colorG = Math.floor(Math.random() * 56) + 200;
  const colorB = Math.floor(Math.random() * 56) + 200;
  const color = colorR.toString(16) + colorG.toString(16) + colorB.toString(16);
  document.getElementById("title").style.backgroundColor = "#" + color;
  const colorBG =
    (colorR - 30).toString(16) +
    (colorG - 30).toString(16) +
    (colorB - 30).toString(16);
  document.getElementById("card").style.backgroundColor = "#" + colorBG;
}
function OpenCard(_data) {
  // :: Get ID title
  let title = document.getElementById("title");

  // :: Get ID line_1 ~ line_5
  let line_1 = document.getElementById("line_1");
  let line_2 = document.getElementById("line_2");
  let line_3 = document.getElementById("line_3");
  let line_4 = document.getElementById("line_4");
  let line_5 = document.getElementById("line_5");

  // :: Set Data
  title.innerHTML = _data.title;
  line_1.innerHTML = _data.line_1;
  line_2.innerHTML = _data.line_2;
  line_3.innerHTML = _data.line_3;
  line_4.innerHTML = _data.line_4;
  line_5.innerHTML = _data.line_5;

  // :: Set Random Color
  SetCardRandomColor();
}
let intervalAuto = null;
function PlayAuto() {
  // :: SE
  PlaySE();
  if (intervalAuto != null) {
    StopAuto();
    return;
  }

  this.PlayAudio();
  document.getElementById("btnAuto").style.backgroundImage =
    "url(./Icon/stop.png)";
  intervalAuto = setInterval(() => {
    const card = GetRandomCard(cardData);
    OpenCard(card);
    SetAudio(card.voice_ids);
    this.PlayAudio();
  }, 60000);
}

function StopAuto() {
  clearInterval(intervalAuto);
  StopAudio();
  document.getElementById("btnAuto").style.backgroundImage =
    "url(./Icon/play.png)";
  intervalAuto = null;
}

const sound = new Audio("success.mp3");

const states = [
  "delhi",
  "jammu and kashmir",
  "ladakh",
  "madhya pradesh",
  "andhra pradesh",
  "arunachal pradesh",
  "assam",
  "bihar",
  "chhattisgarh",
  "goa",
  "gujarat",
  "chandigarh",
  "haryana",
  "himachal pradesh",
  "jharkhand",
  "karnataka",
  "kerala",
  "maharashtra",
  "manipur",
  "meghalaya",
  "mizoram",
  "nagaland",
  "odisha",
  "punjab",
  "rajasthan",
  "sikkim",
  "tamil nadu",
  "telangana",
  "tripura",
  "uttar pradesh",
  "uttarakhand",
  "west bengal",
];

const positions = [
  { top: 370, left: 410 },
  { top: 150, left: 340 },
  { top: 80, left: 380 },
  { top: 550, left: 450 },
  { top: 870, left: 430 },
  { top: 370, left: 950 },
  { top: 440, left: 910 },
  { top: 470, left: 700 },
  { top: 650, left: 540 },
  { top: 870, left: 280 },
  { top: 550, left: 220 },
  { top: 265, left: 410 },
  { top: 310, left: 390 },
  { top: 210, left: 420 },
  { top: 550, left: 670 },
  { top: 900, left: 350 },
  { top: 1050, left: 350 },
  { top: 700, left: 350 },
  { top: 500, left: 950 },
  { top: 480, left: 850 },
  { top: 550, left: 920 },
  { top: 440, left: 970 },
  { top: 680, left: 630 },
  { top: 270, left: 360 },
  { top: 400, left: 290 },
  { top: 390, left: 780 },
  { top: 1050, left: 420 },
  { top: 790, left: 440 },
  { top: 550, left: 880 },
  { top: 400, left: 500 },
  { top: 300, left: 480 },
  { top: 580, left: 750 },
];

let placeFlags = [];

/*function search() {
  const input = document.getElementById("mapstate").value.trim().toLowerCase();
  const position = statePositions[input];

  let Flag = document.getElementById("flag");

  
  if (Flag) {
    Flag.remove();
  }*/

/* if (position) {
    const flag = document.createElement("i");
    flag.className = "bi bi-flag-fill text-danger fs-3";
    flag.id = "flag";
    flag.style.position = "absolute";
    flag.style.top = position.top + "px";
    flag.style.left = position.left + "px";

    document.getElementById("Map").appendChild(flag);
    sound.play();
  } else {
    alert("State not found!");
  }*/

function placeFlag(top, left) {
  const flag = document.createElement("i");
  flag.classList.add("bi", "bi-flag-fill", "text-danger", "fs-3");
  flag.style.position = "absolute";
  flag.style.top = top + "px";
  flag.style.left = left + "px";

  document.getElementById("Map").appendChild(flag);
  placeFlags.push(flag);
}

function search() {
  const input = document.getElementById("mapstate").value.trim().toLowerCase();
  const st = states.indexOf(input);

  if (st !== -1) {
    const pos = positions[st];
    placeFlag(pos.top, pos.left);
    sound.play();
  } else {
    alert("State not found!");
  }
}

document.addEventListener("keydown", (abc) => {
    if (abc.key === "Enter") {
      search();
    }
  });

function clearAll() {
  placeFlags.forEach((flag) => flag.remove());
  placeFlags = [];
}

function markAll() {
  clearAll();
  positions.forEach((pos) => {
    placeFlag(pos.top, pos.left);
    sound.play();
  });
}

/*flag.addEventListener("click", () => {
  const audio = new Audio("sounds/" + stateSounds[index]);
  audio.play();
});*/

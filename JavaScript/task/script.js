
  const userColor = document.getElementById("color1");
  userColor.addEventListener("change", () => changeBGColor(userColor.value));
  function changeBGColor(color1) {
    document.getElementById("box2").style.backgroundColor = color1;
  }


  const userColor2 = document.getElementById("color2");
  userColor2.addEventListener("change", () => changeHDColor(userColor2.value));
  function changeHDColor(color2) {
    document.getElementById("h1").style.color = color2;
  }

  const userColor3 = document.getElementById("color3");
  userColor3.addEventListener("change", () => changePColor(userColor3.value));
  function changePColor(color3) {
    document.getElementById("p").style.color = color3;
  }

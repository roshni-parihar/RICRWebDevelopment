function start() {
  console.log("Game started");
  document.getElementById("roll1").disabled = false;
  document.getElementById("rs1").disabled = false;
  document.getElementById("s1").disabled = true;
}

function restart() {
  window.location.reload();
  console.log("Game Restarted");
}

function P1play() {
  console.log("Player1 Playing");
  let Score = Number(document.getElementById("score1").innerText);
  const DF = Math.floor(Math.random() * 6) + 1;
  console.log(DF);

  switch(DF){
    case 1: {
      document.getElementById("dice1").src="./images/1.png";
        break;
    }
     case 2: {document.getElementById("dice1").src="./images/2.png";
        break;
    }
     case 3: {document.getElementById("dice1").src="./images/3.png";
        break;
    }
     case 4: {document.getElementById("dice1").src="./images/4.png";
        break;
    }
     case 5: {document.getElementById("dice1").src="./images/5.png";
        break;
    }
     case 6: {document.getElementById("dice1").src="./images/6.png";
        break;
    }
     default: {document.getElementById("dice1").src="./images/6.png";
  
    }
  }
  if(DF===6){
 document.getElementById("roll1").disabled = true;
  document.getElementById("roll2").disabled = false;
  }else{
  Score = Score + DF;
  document.getElementById("score1").innerText = Score;}

}

function P2play() {
  console.log("Player2 Playing");
  let Score = Number(document.getElementById("score2").innerText);
  const DF = Math.floor(Math.random() * 6) + 1;
  console.log(DF);
  // shortcut to switch
document.getElementById("dice2").src =`./images/${DF}.png`

    if(DF===6){
 document.getElementById("roll1").disabled = false;
  document.getElementById("roll2").disabled = true;
  }else{
  Score = Score + DF;
  document.getElementById("score2").innerText = Score;}
  
}

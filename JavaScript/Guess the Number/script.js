let randomNumber = Math.floor(Math.random() * 10) + 1;
console.log("Hidden Number:", randomNumber);

function submit() {
  let guess = Number(document.getElementById("guess").value);

  if (guess < 1 || guess > 10) {
    alert("Please enter a number between 1 and 10!");
    return;
  }

  if (guess > randomNumber) {
    alert("OOPS! SORRY!!! TRY A SMALLER NUMBER.");
  } else if (guess < randomNumber) {
    alert("OOPS! SORRY!!! TRY A LARGER NUMBER.");
  } else {
    alert("CONGRATULATIONS! YOU GUESSED IT RIGHT!");

    document.getElementById("guess").value ="";

    
  }

  /*let msg = document.createElement("h3");
  msg.classList.add("fw-bold", "text-center", "p-2");
  document.getElementById("no").appendChild(msg);
  
   msg.innerHTML = "Please enter a number between 1 and 10!";
    msg.style.color = "yellow";(if condition)

     msg.innerHTML = "OOPS! SORRY!!! TRY A SMALLER NUMBER.";
    msg.style.color = "white";

     msg.innerHTML = "OOPS! SORRY!!! TRY A LARGER NUMBER.";
    msg.style.color = "white";

     msg.innerHTML = "CONGRATULATIONS! YOU GUESSED IT RIGHT!";
    msg.style.color = "lime";
  */
}

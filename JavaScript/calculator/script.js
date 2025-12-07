function Click(char) {
  if (char === "=") {
    try {
      const exp = (document.getElementById("show").value = "result");
      document.getElementById("show").value = eval(exp);
    } catch (error) {
      alert("invalid expression");
      document.getElementById("show").value = "";
    }
  } else if (char === "C") {
    document.getElementById("show").value = "";
  } else {
    let exp = document.getElementById("show").value;
    exp = exp + char;
    document.getElementById("show").value = exp;
  }
}

  document.addEventListener("keydown", (abc) => {
  console.log("pressed key", "abc.key");

  if (abc.key === "Enter") {
    Click("=");
  } else if (
    abc.key === "1" ||
    abc.key === "2" ||
    abc.key === "3" ||
    abc.key === "4" ||
    abc.key === "5" ||
    abc.key === "6" ||
    abc.key === "7" ||
    abc.key === "8" ||
    abc.key === "9" ||
    abc.key === "0" ||
    abc.key === "+" ||
    abc.key === "-" ||
    abc.key === "*" ||
    abc.key === "/"
  ) {
    Click(abc.key);
  } else if (abc.key === "Backspace") {
    Click("C");
  } });
  
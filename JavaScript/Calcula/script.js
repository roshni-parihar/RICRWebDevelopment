function Input(char) {
  if (char === "=") {
    try{
    const exp = (document.getElementById("display").value = "result");
    document.getElementById("display").value = eval(exp);}
    catch(error){
        alert("invalid expression");
        document.getElementById("display").value ="";
    }
  } else if (char === "C") {
    document.getElementById("display").value = "";
  } else {
    let exp = document.getElementById("display").value;
    exp = exp + char;
    document.getElementById("display").value = exp;
  }
}

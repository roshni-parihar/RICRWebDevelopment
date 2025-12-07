 function search() {
    const state = document.getElementById("mapstate").value.trim().toLowerCase();

    if(!state){
        alert("State is not selected")
        return
    }

    const flag = document.createElement("i");
    flag.classList.add("bi", "bi-flag-fill",  "text-danger", "fs-3");
    flag.style.position ="absolute";

    if(state === "delhi"){
        flag.style.top ="345px";
        flag.style.left ="360px";
        flag.title = "State: Delhi \nCapital: New Delhi";
    }
     if(state === "punjab"){
    flag.style.top = "250px";
    flag.style.left = "300px";
    flag.title = "State: Punjab \nCapital: Chandigarh";
  }
  if(state === "uttarakhand"){
    flag.style.top = "290px";
    flag.style.left = "420px";
    flag.title = "State: Uttarakhand \nCapital: Dehradun";
  }
  if(state === "haryana"){
    flag.style.top = "330px";
    flag.style.left = "330px";
    flag.title = "State: Haryana \nCapital: Chandigarh";
  }
   if(state === "madhyapradesh"|| "mp"){
    flag.style.top = "545px";
    flag.style.left = "360px";
    flag.title = "State: MadhyaPradesh  \nCapital: Bhopal";
  }
  

    document.getElementById("Map").appendChild(flag);
    document.getElementById("mapstate")
}


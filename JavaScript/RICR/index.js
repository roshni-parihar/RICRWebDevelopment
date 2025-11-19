function Student_Login() {
  console.log("Student Login Button clicked");
}

function Submit() {
  console.log("Submit Button clicked");
  const nm = document.getElementById("PersonName").value;
  const contact = document.getElementById("ContactNumber").value;
  const em = document.getElementById("EmailID").value;
  const qual = document.getElementById("Qualifications").value;
  const clg = document.getElementById("College/School").value;


  const br = document.getElementById("BranchName").value;
  console.log("Name:" + nm);
  console.log("ContactN.:" + contact);
  console.log("Email:" + em);
  console.log("Qualification:" + qual);
  console.log("College/School:" + clg);

  console.log("Branch:" + br);
  alert("Submit done");
   document.getElementById("PersonName").value="";
  document.getElementById("ContactNumber").value="";
   document.getElementById("EmailID").value="";
   document.getElementById("Qualifications").value="";
  document.getElementById("College/School").value="";


   document.getElementById("BranchName").value="";
}

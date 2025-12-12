function Submit(){
    const nm = document.getElementById("name").value.trim();
     const email = document.getElementById("email").value.trim();
      const ph = document.getElementById("phone").value.trim();
       const dob = document.getElementById("dob").value.trim();

      if(!/^[A-za-z ]+$/.test(nm)){
        alert("Wrong Input");
        return;

      }
// [\w \.]+@[a-z\d]+[a-z]+
      if(!/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(email)){
        alert("Wrong Email");
        return;

      }
      if(!/^[6-9]\d{9}&/.test(ph)){
        alert("Wrong NO.");
        return;
      }

const currentYear = new Date().getFullYear();
const birthYear =Number( dob.split("-")[0]);



const currentDate =new Date();
console.log(currentDate);




       const data ={
        FullName: nm,
        Email: email,
        Phone: ph,
        DOB:dob,
       };
       console.log(data);
}
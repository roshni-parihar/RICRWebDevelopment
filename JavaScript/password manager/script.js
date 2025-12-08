function AddData() {
  const Site = document.getElementById("siteName").value.trim();
  const UName = document.getElementById("UserName").value.trim();
  const Pass = document.getElementById("password").value.trim();

  const DataPacket = {
    webSite: Site,
    userName: UName,
    password: Pass,
  };

  console.log(DataPacket);

  /* if(localStorage.get("PasswordManager")){ 

     const Data = JSON.parse(localStorage.getItem("PasswordManager"))}

     else{
          const Data =[];
     }
          */

  const Data = JSON.parse(localStorage.getItem("PasswordManager")) || [];

  Data.push(DataPacket);

  localStorage.setItem("PasswordManager", JSON.stringify(Data));

  document.getElementById("siteName").value = "";
  document.getElementById("UserName").value = "";
  document.getElementById("password").value = "";
}

function DownloadFile() {
  const data = JSON.parse(localStorage.getItem("PasswordManager")) || [];

  if (data.lenght <= 0) {
    alert("no Dta Found");
    return;
  }

  const headers = Object.keys(data[0]).join(",") + "\n";

  const rows = data.map((item) => Object.values(item).join(",")).join("/n");

  const CSVContent = headers + rows;

  const blob = new Blob([CSVContent], { type: "text/csv" });

  const anchorTag = document.createElement("a");

  anchorTag.href =URL.createObjectURL(blob);
  anchorTag.download = "data.csv";
  anchorTag.click();

  localStorage.removeItem("PasswordManager");
}

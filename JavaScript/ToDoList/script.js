function AddTask() {
  const task = document.getElementById("NewTask").value.trim();

  console.log(task);

  if(task){
    const L = document.createElement("li");
  L.classList.add("p-2", "d-flex", "align-items-center", "border-bottom");

  const d = document.createElement("div");
  d.classList.add("w-75");
  d.innerText = task;

  const b = document.createElement("button");
  b.classList.add("btn", "btn-danger", "ms-3");

  b.innerHTML = `<i class="bi bi-trash"></i>Delete`;
  b.onclick = () => {
    L.remove();
  };
  // b.innerText="Delete"

  /* const i= document.createElement("i");
    i.classList.add("bi","bi-trash");

    b.appendChild(i);*/
  L.appendChild(d);
  L.appendChild(b);
  document.getElementById("TaskList").appendChild(L);
  document.getElementById("NewTask").value = "";
  }
}

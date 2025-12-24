async function getProducts2() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");

    const data = await res.json();

    const productList = document.getElementById("productRow");

    data.forEach((element) => {
      const d = document.createElement("div");
      d.classList.add("row", "border", "border-2", "rounded-5", "border-black","mb-4", "h-100", "w-75", "text-center", "p-4");

      d.innerHTML = `
        
    <div class="col-3 p-3 h-50 ">
      <img src="${element.image}" alt=${
        element.title
      } class="w-75 h-100  object-fit-contain" />
    </div>
    <div class="col-9 p-3 d-flex flex-column">
      <div class="fw-bold text-black fs-4">${
        element.title.length > 50
          ? element.title.slice(0, 45) + "..."
          : element.title
      }</div>
      <div class="fw-semibold text-success">${element.rating.rate}/5 (${
        element.rating.count
      })</div>
      <div class="fw-semibold text-danger-emphasis fw-bold  fs-5">₹ ${element.price * 100}</div>
      <div class="mb-2 desc text-primary-emphasis fw-semibold">
        ${element.description.slice(0, 80)}...
      </div>
      <div class="d-flex justify-content-center gap-2">
        <button class="btn  p-2 text-dark border-3 border fw-medium w-25 rounded-5 mt-2">Add to Cart</button>
        <button class="btn  p-2 text-dark border-3 border fw-medium w-25 rounded-5 mt-2">Buy Now</button>
      </div>
  </div>`;

      productList.appendChild(d);
    });
  } catch (error) {
    console.log(error.message);
  }
}

getProducts2();

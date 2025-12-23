async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    const productlist = document.getElementById("product");
    data.forEach((element) => {
      const d = document.createElement("div");
      d.classList.add("card");
      d.innerHTML = `<img src=${element.image} alt=${
        element.title
      } class="h-50 object-fit-contain"/>
        <h3 class="mb-3">${
          element.title.lenght > 50
            ? element.title.slice(0, 45) + "..."
            : element.title
        }</h3>
        <div class="fw-semibold ">${element.rating.rate}/5(${
        element.rating.count
      })</div>
        
        <div class="price text-danger-emphasis fw-bold fs-5">₹${
          element.price * 100
        }</div>
        <div class="desc text-primary-emphasis fw-semibold">
          ${element.description.slice(0, 80)}...
        </div>
        <a
          href="checkout.html"
          class="buy-btn p-2 text-dark border-3 border fw-medium w-50 rounded-5 mt-2"
          >Buy Now</a
        >`;
      productlist.appendChild(d);
    });
  } catch (error) {
    console.log(error.message);
  }
 
}
 getProducts();

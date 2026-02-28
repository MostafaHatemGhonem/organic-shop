const products = [
  {
    name: "Assorted Coffee",
    cat: "Groceries",
    price: "£35.00",
    img: "coffee-asorted-300x300.jpg",
    sale: false,
  },
  {
    name: "Cashew Butter",
    cat: "Groceries",
    price: "£25.00",
    oldPrice: "£35.00",
    img: "cashew-butter-500-300x300.jpg",
    sale: true,
  },
  {
    name: "Diabetic Cookies",
    cat: "Groceries",
    price: "£25.00",
    oldPrice: "£35.00",
    img: "diabetic-cookies-300x300.jpg",
    sale: true,
  },
  {
    name: "Farm Fresh Eggs",
    cat: "Juice",
    price: "£34.00",
    img: "eggs-300x300.jpg",
    sale: false,
  },
  {
    name: "Fresh Orange Juice",
    cat: "Juice",
    price: "£18.00",
    img: "orage-juice-kariz-300x300.jpg",
    sale: false,
  },
  {
    name: "Fresh Organic Honey",
    cat: "Groceries",
    price: "£34.00",
    img: "organic-honey-300x300.jpg",
    sale: false,
  },
  {
    name: "Natural Extracted Edible Oil",
    cat: "Groceries",
    price: "£25.00",
    oldPrice: "£34.00",
    img: "edible-oil-300x300.jpg",
    sale: true,
  },
  {
    name: "Pulses From Organic Farm",
    cat: "Groceries",
    price: "£15.00",
    img: "pulses-300x300.jpg",
    sale: false,
  },
  {
    name: "Wheat From Organic Farms",
    cat: "Groceries",
    price: "£34.00",
    img: "wheat-300x300.jpg",
    sale: false,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-container");
  if (container) {
    container.innerHTML = products
      .map(
        (p) => `
            <div class="col-lg-4"> 
                <div class="product-card mb-4 text-center">
                    <div class="product-img-wrapper position-relative">
                        ${p.sale ? '<span class="sale-badge sale-badge-green">Sale!</span>' : ""}
                        <img src="../assets/images/${p.img}" class="img-fluid main-prod-img">
                    </div>
                    <p class="text-muted mb-1 mt-2" style="font-size: 0.7rem;">${p.cat}</p>
                    <a href="#" class="text-dark text-decoration-none d-block fw-bold mb-1" style="font-size: 0.85rem; line-height: 1.2;">${p.name}</a>
                    <p class="fw-bold mb-0" style="font-size: 0.85rem;">
                        ${p.oldPrice ? `<del class="text-muted me-1 fw-normal">${p.oldPrice}</del>` : ""}
                        ${p.price}
                    </p>
                </div>
            </div>
        `,
      )
      .join("");
  }
});

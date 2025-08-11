// Menu section
const vegFilter = document.getElementById("vegFilter");
const categoryFilter = document.getElementById("categoryFilter");
const dishContainer = document.getElementById("dishContainer");
let cart = [];

const dishes = [
    {
        name: "Paneer Tikka",
        type: "veg",
        category: "starters",
        img: "/TastyNest/frontend/assets/images/dishes/panner tikka.jpg",
        price: 180,
        description:
            "Tender paneer cubes marinated in aromatic spices and grilled to perfection.",
    },
    {
        name: "Chicken Biryani",
        type: "non-veg",
        category: "main-course",
        img: "/TastyNest/frontend/assets/images/dishes/briyani.jpg",
        price: 250,
        description:
            "Aromatic basmati rice cooked with juicy chicken and exotic spices.",
    },
    {
        name: "Lassi",
        type: "veg",
        category: "drinks",
        img: "/TastyNest/frontend/assets/images/dishes/lassi.jpg",
        price: 60,
        description:
            "Refreshing yogurt-based drink blended with sugar and a hint of cardamom.",
    },
    {
        name: "Garlic Naan",
        type: "veg",
        category: "breads",
        img: "/TastyNest/frontend/assets/images/dishes/garlic naan.jpg",
        price: 40,
        description:
            "Soft, fluffy Indian flatbread infused with fresh garlic and butter.",
    },
    {
        name: "Mutton Rogan Josh",
        type: "non-veg",
        category: "main-course",
        img: "/TastyNest/frontend/assets/images/dishes/mutton rogan.jpg",
        price: 320,
        description:
            "A rich and flavorful Kashmiri-style curry with tender mutton pieces.",
    },
    {
        name: "Veg Spring Rolls",
        type: "veg",
        category: "starters",
        img: "/TastyNest/frontend/assets/images/dishes/spring rolls.jpg",
        price: 120,
        description: "Crispy rolls stuffed with a mix of fresh sautéed vegetables.",
    },
    {
        name: "Sweet Corn Soup",
        type: "veg",
        category: "chinese",
        img: "/TastyNest/frontend/assets/images/dishes/sweet corn.jpg",
        price: 90,
        description:
            "Warm and comforting soup made with sweet corn and finely chopped veggies.",
    },
    {
        name: "Caesar Salad",
        type: "veg",
        category: "salads",
        img: "/TastyNest/frontend/assets/images/dishes/caesar salad.jpg",
        price: 110,
        description:
            "Classic Caesar salad with fresh romaine, parmesan, and creamy dressing.",
    },
    {
        name: "Chocolate Brownie",
        type: "veg",
        category: "desserts",
        img: "/TastyNest/frontend/assets/images/dishes/chocolate browine.jpg",
        price: 130,
        description:
            "Decadent, rich and fudgy brownie topped with a hint of chocolate glaze.",
    },
    {
        name: "Butter Chicken",
        type: "non-veg",
        category: "main-course",
        img: "/TastyNest/frontend/assets/images/dishes/butter chicken.jpg",
        price: 270,
        description:
            "Creamy tomato-based curry with tender chicken chunks and Indian spices.",
    },
    {
        name: "Mango Shake",
        type: "veg",
        category: "drinks",
        img: "/TastyNest/frontend/assets/images/dishes/mango shake.jpg",
        price: 70,
        description:
            "Thick and luscious mango shake made from fresh Alphonso mangoes.",
    },
    {
        name: "Cheese Naan",
        type: "veg",
        category: "breads",
        img: "/TastyNest/frontend/assets/images/dishes/cheese naan.jpg",
        price: 50,
        description:
            "Fluffy naan stuffed with gooey cheese, perfect with any curry.",
    },
    {
        name: "Combo Veg Thali",
        type: "veg",
        category: "combos",
        img: "/TastyNest/frontend/assets/images/dishes/thali.jpg",
        price: 220,
        description: "A complete meal with rice, roti, dal, sabzi, and dessert.",
    },
    {
        name: "Chef's Special Platter",
        type: "non-veg",
        category: "special",
        img: "/TastyNest/frontend/assets/images/dishes/chef special platter.jpg",
        price: 360,
        description:
            "A grand assortment of chef's best non-veg dishes served together.",
    },
    {
        name: "Vanilla Ice Cream",
        type: "veg",
        category: "desserts",
        img: "/TastyNest/frontend/assets/images/dishes/vanila icecream.jpg",
        price: 90,
        description: "Classic vanilla ice cream with rich and creamy texture.",
    },
];

// Theme Toggle
const themeToggle = document.createElement("button");
themeToggle.className = "btn btn-outline-dark btn-sm float-end me-3 mt-2";
themeToggle.innerHTML = "🌙";
document.querySelector(".container").prepend(themeToggle);

let dark = false;
themeToggle.addEventListener("click", () => {
    dark = !dark;
    document.body.classList.toggle("bg-dark", dark);
    document.body.classList.toggle("text-white", dark);
    document.querySelectorAll(".card").forEach((card) => {
        card.classList.toggle("bg-dark", dark);
        card.classList.toggle("text-white", dark);
    });
});

// Search Filter Input
const searchRow = document.createElement("div");
searchRow.className = "row mb-3";
searchRow.innerHTML = `
  <div class="col-md-6 mx-auto">
    <input type="text" id="searchInput" class="form-control" placeholder="🔍 Search dishes by name...">
  </div>
`;
document.querySelector(".container").prepend(searchRow);

const searchInput = document.getElementById("searchInput");

// Recommend Top Dishes Based on Price
function getRecommendedDishes() {
    return dishes.sort((a, b) => b.price - a.price).slice(0, 3);
}

function renderRecommended() {
    const top = getRecommendedDishes();
    const container = document.createElement("div");
    container.className =
        "row g-3 mt-2 mb-4 p-3 bg-warning-subtle border rounded";
    container.innerHTML = `<h5 class="fw-bold">🔥 Recommended For You</h5>`;
    top.forEach((d) => {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
      <div class="card shadow-sm">
        <img loading="lazy" src="${d.img}" class="card-img-top" alt="${d.name}"/>
        <div class="card-body">
          <h6 class="card-title">${d.name}</h6>
          <p class="text-muted">${d.description}</p>
          <span class="text-success fw-bold">₹${d.price}</span>
        </div>
      </div>
    `;
        container.appendChild(col);
    });
    document
        .querySelector(".container")
        .insertBefore(container, document.getElementById("dishContainer"));
}

let searchTimeout;
searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(renderDishes, 300);
});


function renderDishes() {
    const type = vegFilter.value;
    const category = categoryFilter.value;
    const searchQuery = searchInput.value.trim().toLowerCase();

    const filtered = dishes.filter((dish) =>
        (type === "all" || dish.type === type) &&
        (category === "all" || dish.category === category) &&
        dish.name.toLowerCase().includes(searchQuery)
    );

    dishContainer.innerHTML = "";

    filtered.forEach((dish) => {
        const col = document.createElement("div");
        col.className = "col-md-4 col-lg-3 mb-4";

        const existing = cart.find((item) => item.name === dish.name);
        const quantity = existing ? existing.qty : 0;

        const showAdd = quantity === 0;
        const showControls = quantity > 0;

        const vegBadge = dish.type === "veg"
            ? '<span class="badge bg-success">Veg</span>'
            : '<span class="badge bg-danger">Non-Veg</span>';

        col.innerHTML = `
            <div class="card dish-card shadow-sm">
                <img loading="lazy" src="${dish.img}" class="card-img-top" alt="${dish.name}">
                <div class="card-body">
                    <span class="badge badge-category">${dish.category.replace("-", " ")}</span>
                    ${vegBadge}
                    <h5 class="card-title mt-2">${dish.name}</h5>
                    <p class="text-muted small">${dish.description}</p>
                    <p class="price-tag">₹${dish.price}</p>

                    <div id="add-${dish.name}" class="text-center" style="display: ${showAdd ? 'block' : 'none'};">
                        <button class="btn btn-primary btn-add" onclick="addToCart('${dish.name}')">Add to Cart</button>
                    </div>

                    <div id="controls-${dish.name}" class="quantity-controls d-flex justify-content-center align-items-center mt-2" style="display: ${showControls ? 'flex' : 'none'};">
                        <button class="btn btn-outline-danger me-2" onclick="changeQty('${dish.name}', -1)">-</button>
                        <span id="qty-${dish.name}" class="fw-bold">${quantity}</span>
                        <button class="btn btn-outline-success ms-2" onclick="changeQty('${dish.name}', 1)">+</button>
                    </div>
                </div>
            </div>
        `;

        dishContainer.appendChild(col);
    });
}



renderRecommended();

function updateDishControls(name) {
    const quantitySpan = document.getElementById(`qty-${name}`);
    const item = cart.find((i) => i.name === name);
    if (!item) {
        // Item removed
        document.getElementById(`add-${name}`).style.display = "block";
        document.getElementById(`controls-${name}`).style.display = "none";
    } else {
        quantitySpan.textContent = item.qty;
        document.getElementById(`add-${name}`).style.display = "none";
        document.getElementById(`controls-${name}`).style.display = "flex";
    }
}


function addToCart(name) {
    const item = dishes.find((d) => d.name === name);
    const existing = cart.find((i) => i.name === name);
    if (existing) return;
    cart.push({ name: item.name, qty: 1, price: item.price });
    updateCartCount();
    saveCart();
    updateDishControls(name);
}

function changeQty(name, delta) {
    const item = cart.find((i) => i.name === name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter((i) => i.name !== name);
    updateCartCount();
    saveCart();
    updateDishControls(name);
}

function updateCartCount() {
    const total = cart.reduce((sum, i) => sum + i.qty, 0);
    document.getElementById("cartCount").textContent = total;
}

function showCartItems() {
    const list = document.getElementById("cartItemList");
    list.innerHTML = "";
    if (cart.length === 0) {
        list.innerHTML = "<p class='text-muted'>Your cart is empty.</p>";
        document.getElementById("cartTotal").textContent = "0";
        return;
    }
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.qty;
        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
      <div>
        ${item.name} <span class="badge bg-primary rounded-pill">${item.qty} x ₹${item.price}</span>
      </div>
      <button class="btn btn-sm btn-danger ms-2" onclick="removeItem(${index})">Remove</button>
    `;
        list.appendChild(li);
    });
    document.getElementById("cartTotal").textContent = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartCount();
    saveCart();
    renderDishes();
}

function proceedToCheckout() {
    alert(
        "✅ Proceeding to checkout with total ₹" +
        cart.reduce((sum, item) => sum + item.qty * item.price, 0)
    );
}

function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cart));
}

function loadCart() {
    const data = localStorage.getItem("cartItems");
    if (data) cart = JSON.parse(data);
    updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    renderRecommended();
    renderDishes();
    vegFilter.addEventListener("change", renderDishes);
    categoryFilter.addEventListener("change", renderDishes);
});
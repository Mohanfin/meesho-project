let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* Add Product to Cart */
function addToCart(productName, price) {

    const product = {
        name: productName,
        price: price
    };

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(productName + " added to cart!");
}


/* Update Cart Count */
function updateCartCount() {

    const cartCount = document.querySelector(".cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}


/* Display Cart Products */
function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");

    if (!cartItems || !totalElement) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price;

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
            <div>
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}</p>
            </div>

            <button onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(item);
    });

    totalElement.textContent = total;
}


/* Remove Product */
function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

    updateCartCount();
}


/* Run Functions */
updateCartCount();
displayCart();
/* Search Products */

function searchProducts() {

    const searchInput = document.getElementById("searchInput");

    const searchText = searchInput.value.toLowerCase();

    const products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        const productName = product
            .querySelector(".product-name")
            .textContent
            .toLowerCase();

        if (productName.includes(searchText)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });
}
/* Buy Now */

function buyNow(productName, price) {

    const product = {
        name: productName,
        price: price
    };

    localStorage.setItem(
        "buyNowProduct",
        JSON.stringify(product)
    );

    window.location.href = "checkout.html";
}
/* Display Buy Now Product */

function displayCheckoutProduct() {

    const checkoutProduct =
        document.getElementById("checkout-product");

    if (!checkoutProduct) {
        return;
    }

    const product =
        JSON.parse(localStorage.getItem("buyNowProduct"));

    if (!product) {
        checkoutProduct.innerHTML =
            "<p>No product selected.</p>";
        return;
    }

    checkoutProduct.innerHTML = `
        <div class="checkout-product-card">

            <h3>${product.name}</h3>

            <p>Price: ₹${product.price}</p>

        </div>
    `;
}

displayCheckoutProduct();
/* Register User */

function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value;

    const email =
        document.getElementById("registerEmail").value;

    const mobile =
        document.getElementById("registerMobile").value;

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

        alert("Passwords do not match!");

        return;
    }


    const user = {

        name: name,
        email: email,
        mobile: mobile,
        password: password

    };


    localStorage.setItem(
        "registeredUser",
        JSON.stringify(user)
    );


    alert("Account created successfully!");

    window.location.href = "login.html";
}


/* Login User */
function loginUser(event) {

    event.preventDefault();

    const loginUserValue = document.getElementById("loginUser").value.trim();
    const loginPassword = document.getElementById("loginPassword").value;

    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!storedUser) {
        alert("Please create an account first!");
        return;
    }

    const validUser =
        loginUserValue === storedUser.email ||
        loginUserValue === storedUser.mobile;

    const validPassword =
        loginPassword === storedUser.password;

    if (validUser && validPassword) {

        localStorage.setItem("isLoggedIn", "true");

        alert("Login successful!");

        window.location.href = "./index.html";

    } else {

        alert("Invalid email/mobile or password!");

    }
}
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
}
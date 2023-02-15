// Client facing scripts here
const foodItems = document.querySelectorAll('.food-item');
const menus = document.querySelectorAll('.menu');

foodItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (menus[index].style.display === 'none') {
      menus.forEach((menu) => {
        menu.style.display = 'none';
      });
      menus[index].style.display = 'block';
    } else {
      menus[index].style.display = 'none';
    }
  });
});
// Get the add to cart buttons
var addToCartButtons = document.querySelectorAll(".add-to-cart");

// Get the cart items list and the total price element
var cartItemsList = document.querySelector(".cart-items");
var totalPrice = document.querySelector(".total");

// Get the checkout button
var checkoutButton = document.querySelector(".checkout");

// Get the popup, the close button and the shopping cart container
var popup = document.querySelector(".popup");
var closeButton = document.querySelector(".close-popup");
var cartContainer = document.querySelector(".cart-container");

// Get the open cart button
var openCartButton = document.querySelector(".open-cart");

// Initialize the cart items array and the total price
var cartItems = [];
var total = 0;

// Loop through each add to cart button and add an event listener
addToCartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        // Get the name and price of the product
        var name = button.getAttribute("data-name");
        var price = button.getAttribute("data-price");

        // Add the item to the cart items array
        cartItems.push({name: name, price: price});

        // Update the cart items list and the total price
        updateCart();

        // Show the popup and the shopping cart container
        popup.style.display = "block";
        cartContainer.style.display = "block";
    });
});

// Add an event listener to the close button to close the popup and the shopping cart container
closeButton.addEventListener("click", function() {
    popup.style.display = "none";
    cartContainer.style.display = "none";
});

// Add an event listener to the open cart button to open the shopping cart container
openCartButton.addEventListener("click", function() {
    cartContainer.style.display = "block";
});

// Update the cart items list and the total price
function updateCart() {
    // Clear the cart items list
    cartItemsList.innerHTML = "";

    // Loop through each item in the cart items array and add it to the list
    cartItems.forEach(function(item) {
        var li = document.createElement("li");
        li.textContent = item.name + " - $" + item.price;
        cartItemsList.appendChild(li);

        // Add the item price to the total price
        total += parseInt(item.price);
    });

    // Update the total price element
    totalPrice.textContent = "Total: $" + total;

    // Enable or disable the checkout button based on whether there are items in the cart
    checkoutButton.disabled = (cartItems.length === 0);
}

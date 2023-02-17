$(document).ready(function () {
  $(".button-buy").click(function () {
    update();
    const orderMessage = [
  {
    title: '\n                Wonton Soup\n              ',
    price: '\n                7.50\n              '
  },
  {
    title: '\n                Scallion Pancakes\n              ',
    price: '\n                6.75\n              '
  },
  {
    title: '\n                Fried Wontons\n              ',
    price: '\n                7.00\n              '
  }
]
    const orderData = {
      orderMessage, 
      totalPrice: document.querySelector('.total-price').innerHTML
    }
    console.log("orderData", orderData)
    const order = JSON.stringify(itemsAdded)
    $.post( "/", { order })
  
  });
  console.log( "ready!" );
});


//open & close cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");


cartIcon.addEventListener("click", () => {
  cart.classList.add("active")
})

closeCart.addEventListener("click", () => {
  cart.classList.remove("active")
})

addEvents();

// Start when the document is ready
// if (document.readyState === "loading") {
//   document.addEventListener('DOMContentLoaded', start)
// } else {
//   start();
// }
// start
// function start() {
//   addEvents()
// }

// Client facing scripts here
function CartBoxComponent(title, price) {
  return `<div class="cart-box">
        <div class="detail-box">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div>
          <input type="number" value="1" class="cart-quantity" />

        </div>
        <i class="fa-solid fa-trash-can cart-remove"></i>
      </div>`
}

// handle events functions
let itemsAdded = []
function handleAddCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  console.log(document.querySelector(".cart-quantity"))
  // let quantity = document.querySelector(".cart-quantity").val();
  console.log(title, price)

  let newToAdd = {
    title,
    price
  }
  // handle item if already exists
  if (itemsAdded.find(element => element.title === newToAdd.title)) {
    alert("This item aleady exists!");
    return;
  } else {
    itemsAdded.push(newToAdd)
  }
console.log("itemsAdded", itemsAdded)
  //add product to cart
  let cartBoxElement = CartBoxComponent(title, price)
  let newNode = document.createElement("div")
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode)

  update();
}




function handleChangeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // to keep it an int
  update()
}

function handleBuyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There is no order to place yet! \n Please make an order first.")
    return;
  }

  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = '';
  alert("Your Order is Placed Successfully");

  update();
}
// update & rerender functions
function updateTotal() {
  let cartBoxes = document.querySelectorAll('.cart-box');
  const totalElement = document.querySelector('.total-price')
  let total = 0;
  cartBoxes.forEach(cartBox => {
    let priceElement = cartBox.querySelector('.cart-price');
    let price = parseFloat(priceElement.innerHTML.replace("$", ""))
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;

  })
  total = total.toFixed(2)
  totalElement.innerHTML = "$" + total


}

function handleRemoveCartItem () {
  const parentElement = this.parentElement;
  parentElement.remove();
  itemsAdded = itemsAdded.filter(element => element.title !== parentElement.querySelector(".cart-product-title").innerHTML);
  update();
}

// add events

function addEvents() {
  // remove from cart
  let cartRemoveButtons = document.querySelectorAll('.cart-remove');
  console.log(cartRemoveButtons);
  cartRemoveButtons.forEach(button => {
    button.addEventListener("click", handleRemoveCartItem)
  });
  // change item quantity
  let cartQuantityInputs = document.querySelectorAll('.cart-quantity');
  cartQuantityInputs.forEach(input => {
    input.addEventListener("change", handleChangeItemQuantity)
  })

  // add item to cart
  let addCartButtons = document.querySelectorAll(".add-cart");
  addCartButtons.forEach(button => {
    button.addEventListener("click", handleAddCartItem)
  })

  // buy order
  const buyButton = document.querySelector(".button-buy");
  buyButton.addEventListener("click", handleBuyOrder)
}

// update & rerender
function update() {
  addEvents();
  updateTotal();
}

// Drop down menus 
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

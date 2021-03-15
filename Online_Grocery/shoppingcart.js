var itemQuantity;
window.addEventListener("load", () => {
  displayCart();
  itemQuantity = document.getElementsByClassName("quantity");

  for (var i = 0; i < itemQuantity.length; i++) {
    itemQuantity[i].onchange = () => {
      updateSubTotal();
    };
  }
  updateSubTotal();
  deliveryDate();
});

function updateSubTotal() {
  var cartItem = document.getElementsByClassName("itemPrice");

  var subTotal = 0;
  var itemSubTotal = document.getElementsByClassName("itemSubTotalPrice");
  for (var i = 0; i < cartItem.length; i++) {
    var cartItemSubPrice = cartItem[i].innerHTML;

    var quantity = itemQuantity[i].value;

    var itemTotal = cartItemSubPrice * quantity;
    subTotal = subTotal + quantity * cartItemSubPrice;
    itemSubTotal[i] = itemTotal;
    document.getElementsByClassName("itemSubTotalPrice")[
      i
    ].innerHTML = itemTotal.toFixed(2);
  }

  document.getElementById("subTotal").innerHTML = "$" + subTotal.toFixed(2);

  var tax = subTotal * 0.15;
  document.getElementById("tax").innerHTML = "$" + tax.toFixed(2);

  var total = subTotal + tax;
  document.getElementById("total").innerHTML = "$" + total.toFixed(2);
}

function deliveryDate() {
  var today = new Date();
  var deliveryDate = new Date();
  deliveryDate.setDate(today.getDate() + 2);
  document.getElementById("dateID").innerHTML = deliveryDate.toDateString();
}

function updateTax() {}

/**
 * Displays all cart items.
 */
function displayCart() {
  var cartItems = localStorage.getItem("User:Cart");
  cartItems = JSON.parse(cartItems);
  var itemsProducts = document.querySelector(".itemsProducts");
  itemsProducts.innerHTML = "";
  for (var i = 0; i < cartItems.items.length; i++) {
    itemsProducts.innerHTML += `<div class="row mb-4">
      <div class="col-md-5 col-lg-3 col-xl-3">
        <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
          <a href="#!">
            <img class="img-fluid w-100" src="${cartItems.items[i].imgSrc}" alt="Sample" />
          </a>
        </div>
      </div>
      <div class="col-md-7 col-lg-9 col-xl-9">
        <div>
          <div class="d-flex justify-content-between">
            <div>
              <h5>${cartItems.items[i].name}</h5>
              <p class="mb-3 text-muted text-uppercase small">
                IMPORTED FROM: USA
              </p>
              <p class="mb-2 text-muted text-uppercase small">
                Item 2432
              </p>
              <p class="mb-3 text-muted text-uppercase small">
                Weight: 150 g
              </p>
            </div>
            <div>
              <div class="def-number-input number-input mb-0 w-100">
                <button onclick="this.parentNode.querySelector('input[type=number]').stepDown(); updateSubTotal();" class="minus">
                  -
                </button>
                <input class="quantity" min="1" name="quantity" value="${cartItems.items[i].amount}" type="number" />
                <button onclick="this.parentNode.querySelector('input[type=number]').stepUp(); updateSubTotal();" class="plus">
                  +
                </button>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <a href="#!" type="button" class="card-link-secondary small text-uppercase mr-3"><i class="fas fa-trash-alt mr-1"></i> Remove item
              </a>
            </div>
            <strong>Price per item: $<strong class="itemSubTotalPrice">${cartItems.items[i].price}</strong></strong>
          </div>
        </div>
      </div>
    </div>`;
  }
}

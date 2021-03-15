var itemQuantity;
window.onload = () => {
  itemQuantity = document.getElementsByClassName("quantity");

  for (var i = 0; i < itemQuantity.length; i++) {
    itemQuantity[i].onchange = () => {
      updateSubTotal();
    };
  }
  updateSubTotal();
  deliveryDate();
};

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

function refreshPage() {
  //ON LOAD -> gets caleld after page
}

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
  var cartItem = document.getElementsByClassName("itemSubTotalPrice");

  var subTotal = 0;
  for (var i = 0; i < cartItem.length; i++) {
    var cartItemSubPrice = cartItem[i].innerHTML;

    var quantity = itemQuantity[i].value;

    var itemTotal = cartItemSubPrice * quantity;
    subTotal = subTotal + quantity * cartItemSubPrice;
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

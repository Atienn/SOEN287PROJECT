function refreshPage() {
  //ON LOAD -> gets caleld after page
}

var itemQuantity;
window.onload = () => {
  itemQuantity = document.getElementsByClassName("quantity");
  // listen to something
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

  var total = 0;
  for (var i = 0; i < cartItem.length; i++) {
    var cartItemSubPrice = cartItem[i].innerHTML;

    var quantity = itemQuantity[i].value;

    var itemTotal = cartItemSubPrice * quantity;
    total = total + quantity * cartItemSubPrice;
  }
  document.getElementById("subTotal").innerHTML = "$" + total.toFixed(2);
}

function deliveryDate() {
  var today = new Date();
  var deliveryDate = new Date();
  deliveryDate.setDate(today.getDate() + 2);
  document.getElementById("dateID").innerHTML = deliveryDate.toDateString();
}

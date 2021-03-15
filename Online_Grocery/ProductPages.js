let cartButton;

let currentProduct = {};

window.addEventListener("load", () => {
  //Set an empty array.
  currentProduct.name = document.getElementsByTagName("title")[0].innerText;
  currentProduct.imgSrc = document
    .querySelector(".itemImg")
    .getAttribute("src");
  currentProduct.price = parseFloat(
    document.querySelector(".itemPrice").innerText.replace("$", "")
  );
  
  //Select all 'add to cart' buttons on the page.
  cartButton = document.querySelector(".btn-danger");

  //Loop through each button (and therefore each product) on the page.

  //Callback to click event.
  //If a button is clicked, add the product to cart.
  cartButton.addEventListener("click", () => {
    //updateCartStorage(pageProducts[i]);
    //Add the product to the browser storage.
    console.log(document.querySelector(".quantity"));
    addItemToCart(
      currentProduct,
      parseInt(document.querySelector(".quantity").value)
    );
  });
});

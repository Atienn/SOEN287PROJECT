//Array of all 'add to cart' buttons on the page.
let carts;

//Arrays of different products the user could add to cart on the page.
let products = [];


//Specify callback for window load.
//When the page will have finished loading, this anonmymous function will execute.
window.onload = () => {

  //Select all 'add to cart' buttons on the page. 
  carts = document.querySelectorAll('.btn-danger');
  

  for (let i = 0; i < carts.length; i++) {
  
    //Create a new object holding all values of the element which will be used to display it in the cart.
    element = {
      name: document.querySelectorAll('.name')[i].innerText, //Item name.
      tag: document.querySelectorAll('.itemImg')[i].getAttribute('src'), //Image link.
      price: parseFloat(document.querySelectorAll('.price')[i].innerText.replace("$","")), //Item price.
      inCart: 0 //Number of items in cart.
    }

    //Add the element to the end of the array.
    products.push(element);

    //Make each 'add to cart' button react to click.
    carts[i].addEventListener('click', () => {
      //
      updateCartNumber(products[i]);
      //
      totalCost(products[i])
    })
  }

  //Update the displayed number of items in cart to show the correct value.
  updateCartNum();
}



/**
 * Updates the displayed number of items in cart to show the current value.
 */
function updateCartNum() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}


/**
 * Updates the displayed number of items in cart to show the correct value.
 * @param {*} product 
 */
function updateCartNumber(product) {

  let productNumbers = parseInt(localStorage.getItem('cartNumbers'));
  productNumbers = parseInt(productNumbers);

  //If the number is valid and higher than 0, 
  if (Boolean(productNumbers)) {
    //Add one to stored the amount of items in cart.
    localStorage.setItem('cartNumbers', productNumbers + 1);
    //Add one to the displayed amount of items in cart.
    document.querySelector('.cart span').textContent = productNumbers + 1;
  } 

  //Otherwise, this is the first item being added to cart.
  else {
    //Set the stored amount of items in cart to 1.
    localStorage.setItem('cartNumbers', 1);
    //Set the displayed amount of items in cart to 1.
    document.querySelector('.cart span').textContent = 1;
  }

  //Add the product to the localstorage. 
  //Should be moved out of this function since it's not dependent on updating the amount of items in cart.
  setItems(product);
}


/**
 * 
 * @param {Object} product 
 */
function setItems(product) {

  let cartItems = localStorage.getItem('productsInCart');
  
  cartItems = JSON.parse(cartItems);
  console.log("My cartItems are: ", cartItems);
  if (cartItems != null) {
    if(cartItems[product.tag] == undefined){
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
    [product.tag]: product
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


/**
 * 
 * @param {*} product 
 */
function totalCost(product){
  let cartCost = localStorage.getItem('totalCost');

  if(cartCost != null){
    cartCost = parseFloat(cartCost);
    localStorage.setItem("totalCost", Math.round((cartCost + product.price)*100)/100);
  }else{
    localStorage.setItem("totalCost",Math.round((product.price*100)/100));
  }
}


/**
 * 
 */
function search_item() {
    var input, filter, section, item, name, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    section = document.getElementById("products");
    item = section.getElementsByClassName("col-sm");
    for (i = 0; i < item.length; i++) {
        name = item[i].getElementsByTagName("p")[0];
        txtValue = name.textContent || name.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            item[i].style.display = "";
        } else {
            item[i].style.display = "none";
        }
    }
}



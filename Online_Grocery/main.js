let carts = document.querySelectorAll('.btn-danger');

let products = [];

for (let i = 0; i < carts.length; i++) {
     element= {
     name: document.querySelectorAll('.name')[i].innerText,
     tag: document.querySelectorAll('.itemImg')[i].getAttribute('src'),
     price: parseFloat(document.querySelectorAll('.price')[i].innerText.replace("$","")),
     inCart: 0
   }
   products.push(element);
  carts[i].addEventListener('click', () => {
    carNumbers(products[i]);
    totalCost(products[i])
  })
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

function carNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  console.log("My cartItems are", cartItems);
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

function totalCost(product){
  let cartCost = localStorage.getItem('totalCost');

  if(cartCost != null){
    cartCost = parseFloat(cartCost);
    localStorage.setItem("totalCost", Math.round((cartCost + product.price)*100)/100);
  }else{
    localStorage.setItem("totalCost",Math.round((product.price*100)/100));
  }
}

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
onLoadCartNumbers();

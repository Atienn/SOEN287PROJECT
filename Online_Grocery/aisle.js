//THIS SCRIPT IS NECESSARY ON EACH PAGE WHERE THE USER CAN ADD ITEMS TO
//THIER CART.

//#region VARIABLES

//Array of all 'add to cart' buttons on the page.
let cartButtons;
//Array of different products the user could add to cart on the page.
let pageProducts;

//#endregion


//#region EVENT CALLBACKS

window.addEventListener("load", () => {
    
	//Set an empty array.
	pageProducts = [];
	//Select all 'add to cart' buttons on the page. 
	cartButtons = document.querySelectorAll('.btn-danger');

	//Loop through each button (and therefore each product) on the page.
	for (let i = 0; i < cartButtons.length; i++) {

		//Create a new object holding all values of the element which will be 
		//used to display it in the cart and add it at the end of the array.
		pageProducts.push({
			//Item name.
			name: document.querySelectorAll('.name')[i].innerText,
			//Image source.
			imgSrc: document.querySelectorAll('.itemImg')[i].getAttribute('src'),
			//Item price.
			price: parseFloat(document.querySelectorAll('.price')[i].innerText.replace("$", "")),
			//Number of items in cart. Is set to 1 to simplify the process of adding items to cart.
			amount: 1
		});

		//Callback to click event.
		//If a button is clicked, add the product to cart.
		cartButtons[i].addEventListener('click', () => {
			//
			//updateCartStorage(pageProducts[i]);
			//Add the product to the browser storage. 
			addItemToCart(pageProducts[i]);
			//Recalculate the total cost of the cart.
			calcTotalPrice(pageProducts[i]);
		})
	}
});

//#endregion


//#region BROWSER STORAGE

/**
 * Adds an item to the user's cart. Updates the 'itemAmount' and 
 * 'totalPrice' values of the 'userCart' object.
 * @param {Object} product - The product to add to the cart.
 */
 function addItemToCart(product, amount = 1) {

	//The following checks if the item type is already within the cart.
	//If it is, increment its 'amount' property by 1 instead of adding it again.
	
	//Assume that the item type isn't already inside the cart.
	let insideCart = false;

	//Go through each item present in the cart.
	userCart.items.forEach(item => {
		//If the name of the item that of the product being added, then it's a match.
		if (item.name == product.name) {
			//Correct our assumption, the item type was within the cart.
			insideCart = true;
			//Increase the amount of the item in cart by 1.
			item.amount += amount;
		}
	});
	
	//If the item type wasn't within the cart, then add it to the array.
	if(!insideCart) {
		userCart.items.push(product);
	}

	//Regardless of which happened, up the cart item counter by 1.
	userCart.itemAmount += amount;
	//and add the product price to the cart total price.
	userCart.totalPrice += product.price * amount;

	//Save the changes to the cart.
	saveCart();

	//Update the number of items in cart displayed.
	updateItemCount();
}

//#endregion
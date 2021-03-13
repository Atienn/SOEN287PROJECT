//#region VARIABLES

//Array of all 'add to cart' buttons on the page.
let cartButtons;
//Array of different products the user could add to cart on the page.
let pageProducts;

//Object representing the user's cart. Contains the 
let userCart;

//HTML input field used for the search bar.
let searchInput;

//#endregion


//#region EVENT CALLBACKS
//Code that gets executed in reaction to event in the webpage.

//Callback for window load.
//When the page will have finished loading, the given anonmymous function will execute.
//Initializes global variables and sets up events listeners.
window.onload = () => {

	//Set an empty array.
	pageProducts = [];
	//Select all 'add to cart' buttons on the page. 
	cartButtons = document.querySelectorAll('.btn-danger');
	//Select the input field on the navbar.
	searchInput = document.getElementById("search");

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

	//Check if there is already a cart in browser storage.
	userCart = JSON.parse(localStorage.getItem('User:Cart'));
	//If none exists yet. Create a new empty one.
	if (!userCart) { resetCart(); }

	//Updates the amount of items in cart shown on the navbar.
	updateItemCount();
}


//Callback before window unload.
//While the page is unloading (in the process of moving to a new one) the anonymous function is called.
//Saves the user's cart in browser storage (some browsers might choose not to execute this, should not be relied upon).
window.onbeforeunload = () => {
	localStorage.setItem('User:Cart', JSON.stringify(userCart));
}

//#endregion


//#region BROWSER STORAGE

/** 
 * Overrides the current cart (if any) with an empty one.
 * 
 * The cart is set under 'User:Cart' within browser simply to
 * specify that the stored data relates to the user. 
 */
function resetCart() {
	//Create a new empty cart object.
	userCart = {
		items: [],
		itemAmount: 0,
		totalPrice: 0
	};
	//Convert the object into a string (required for JSON storage)
	//and store it under the label 'User:Cart'.
	localStorage.setItem('User:Cart', JSON.stringify(userCart));

	//Update the number of items in cart displayed.
	updateItemCount();
}


/**
 * Adds an item to the user's cart. Updates the 'itemAmount' and 
 * 'totalPrice' values of the 'userCart' object.
 * @param {Object} product - The product to add to the cart.
 */
function addItemToCart(product) {

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
			item.amount++;
		}
	});
	
	//If the item type wasn't within the cart, then add it to the array.
	if(!insideCart) {
		userCart.items.push(product);
	}

	//Regardless of which happened, up the cart item counter by 1.
	userCart.itemAmount++;
	//and add the product price to the cart total price.
	userCart.totalPrice += product.price;

	//Update the number of items in cart displayed.
	updateItemCount();
}

//#endregion


//#region DISPLAY

/**
 * Updates the number of items in cart displayed on the navbar 
 * to represent the current value inside browser storage.
 */
function updateItemCount() {
	document.querySelector('.cart span').textContent = userCart.itemAmount;
}

//#endregion


//#region OTHER

/**
 * Hides every product on the page who's name doesn't 
 * contain string inside of the search bar's input field.
 */
 function search_item() {

	//Get the array of div elements that hold each product of the page.
	let productDivs = document.getElementById("products").getElementsByClassName("col-sm");

	//For each product div on the page.
	for (let i = 0; i < productDivs.length; i++) {

		//The following condition is fairly complex, so I've broken it to comment parts separately.
		if (
			//If the text of the product div's first paragraph element (the product name)...
			!productDivs[i].getElementsByTagName("p")[0].textContent.toUpperCase()
			//...doesn't include the text within the search bar input field (ignoring case-sensitivity)...
			.includes(searchInput.value.toUpperCase())
		) {
			//...then hide the said product div (only show those who match).
			productDivs[i].style.display = "none";
		}
	}
}


/**
 * Recalculates the cart's total price and amount of item trackers. 
 */
function cartDebug() {
	//Call both functions.
	calcItemAmount();
	calcTotalPrice();
}

/**
 * Recalculates the total price tracker ('totalPrice' property) of the 'userCart'.
 */
function calcTotalPrice() {
	//Start the price at 0.
	let calculatedTotal = 0;

	//Add the price of each element to the calculated total.
	userCart.items.forEach(item => {
		calculatedTotal += item.price;
	});

	//Replace the totalPrice with the calculated value.
	userCart.totalPrice = calculatedTotal;
}

/**
 * Recalculates the amount of items tracker ('itemAmount' property) of the 'userCart'.
 */
function calcItemAmount() {
	//Start the price at 0.
	let calculatedAmount = 0;

	//Add the amount of each element type to calculated total.
	userCart.items.forEach(item => {
		calculatedAmount += item.amount;
	});

	//Replace the totalPrice with the calculated value.
	userCart.itemAmount = calculatedAmount;
}

//#endregion
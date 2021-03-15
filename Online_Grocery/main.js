//THIS SCRIPT IS NECESSARY ON EVERY PAGE WITH THE NAVBAR IN ORDER TO SHOW
//THE NUMBER OF ITEMS IN CART.

//#region VARIABLES

//Object representing the user's cart. Contains each item type within the cart.
let userCart;
//HTML input field used for the search bar.
let searchInput;

//#endregion

//#region EVENT CALLBACKS
//Code that gets executed in reaction to event in the webpage.

//Callback for window load.
//When the page will have finished loading, the given anonmymous function will execute.
//Initializes user cart.
window.addEventListener("load", () => {
	//Select the input field on the navbar.
	searchInput = document.getElementById("search");

	//Check if there is already a cart in browser storage.
	//Only parse the item isn't undefined.
	if (!(localStorage.getItem("User:Cart") == "undefined")) {
		userCart = JSON.parse(localStorage.getItem("User:Cart"));
	}
	//If none exists yet. Create a new empty one.
	//This will automatically execute if 'User:Cart' in browser storage was undefined.
	if (!userCart) {
		resetCart();
	}

	//Updates the amount of items in cart shown on the navbar.
	updateItemCount();
});

//Callback before window unload.
//While the page is unloading (in the process of moving to a new one) the anonymous function is called.
//Saves the user's cart in browser storage (some browsers might choose not to execute this, should not be relied upon).
window.onbeforeunload = () => {
	//Only save the cart if it's not undefined.
	if (!(typeof userCart == "undefined")) {
		localStorage.setItem("User:Cart", JSON.stringify(userCart));
	}
};

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
		totalPrice: 0,
	};

	//Save the changes to the cart.
	saveCart();

	//Update the number of items in cart displayed.
	updateItemCount();
}

/**
 * Convert 'userCart' into a string (required for JSON storage)
 * and store in browser storage it under the label 'User:Cart'.
 */
function saveCart() {
	localStorage.setItem("User:Cart", JSON.stringify(userCart));
}

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
	userCart.items.forEach((item) => {
		//If the name of the item that of the product being added, then it's a match.
		if (item.name == product.name) {
			//Correct our assumption, the item type was within the cart.
			insideCart = true;
			//Increase the amount of the item in cart by 1.
			item.amount += amount;
		}
	});

	//If the item type wasn't within the cart, then add it to the array.
	if (!insideCart) {
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

/**
 * Removes an item type from the cart with
 */
function removeItemFromCart(productName) {

	//Tracks if an item type has been removed from the cart.
	//Assume that no item will be removed.
	let removedItem = false;

	//Go through each item present in the cart.
	for (let i = 0; i < userCart.items.length; i++) {

		//If the name of the item that of the product being removed, then it's a match.
		if (userCart.items[i].name == productName) {

			//Correct our assumption.
			removedItem = true;
			//Remove the element from the array.
			userCart.items.splice(i, 1);

			//End the loop if the item to remove has been found.
			continue;
		}
	}

	//Only recalculate the item amount and cart price if an item type has been removed.
	if(removedItem) { calcCartValues(); }
}


//#endregion

//#region DISPLAY

/**
 * Updates the number of items in cart displayed on the navbar
 * to represent the current value inside browser storage.
 */
function updateItemCount() {
	document.querySelector(".cart span").textContent = userCart.itemAmount;
}

//#endregion

//#region OTHER

/**
 * Hides every product on the page who's name doesn't
 * contain string inside of the search bar's input field.
 */
function search_item() {
	//Get the array of div elements that hold each product of the page.
	let productDivs = document
		.getElementById("products")
		.getElementsByClassName("col-sm");

	//For each product div on the page.
	for (let i = 0; i < productDivs.length; i++) {
		//The following condition is fairly complex, so I've broken it to comment parts separately.
		if (
			//If the text of the product div's first paragraph element (the product name)...
			!productDivs[i]
				.getElementsByTagName("p")[0]
				.textContent.toUpperCase()
				//...doesn't include the text within the search bar input field (ignoring case-sensitivity)...
				.includes(searchInput.value.toUpperCase())
		) {
			//...then hide the said product div (only show those who match).
			productDivs[i].style.display = "none";
		} else {
			//...resets the display property back to what it was initially
			productDivs[i].style.display = "";
		}
	}
}

/**
 * Recalculates the cart's total price and amount of item trackers.
 */
function calcCartValues() {
	//Call both functions.
	calcItemAmount();
	calcTotalPrice();

	//Save the changes to the cart.
	saveCart();
}

/**
 * Recalculates the total price tracker ('totalPrice' property) of the 'userCart'.
 */
function calcTotalPrice() {
	//Start the price at 0.
	let calculatedTotal = 0;

	//Add the price of each element to the calculated total.
	userCart.items.forEach((item) => {
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
	userCart.items.forEach((item) => {
		calculatedAmount += item.amount;
	});

	//Replace the totalPrice with the calculated value.
	userCart.itemAmount = calculatedAmount;

	//Update the number of items displayed if there was any change.
	updateItemCount();
}

//#endregion
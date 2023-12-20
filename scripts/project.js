// === constants ===
const MAX_QTY = 9;
const MIN_QTY = 1;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";

// === global variables  ===
// the total cost of selected products 
let total = 0;

// function called when page is loaded, it performs initializations 
let init = function () {
	createShop();
}
window.addEventListener("load", init);

// usefull functions
/*
* create and add all the div.produit elements to the div#boutique element
* according to the product objects that exist in 'catalog' variable
*/
let createShop = function () {
	let shop = document.getElementById("boutique");
	for(i = 0; i < catalog.length; i++) {
		shop.appendChild(createProduct(catalog[i], i));
	}
}

/*
* create the div.produit elment corresponding to the given product
* The created element receives the id "index-product" where index is replaced by param's value
* @param product (product object) = the product for which the element is created
* @param index (int) = the index of the product in catalog, used to set the id of the created element
*/
let createProduct = function (product, index) {
	// build the div element for product
	let block = document.createElement("div");
	block.className = "produit";
	// set the id for this product
	block.id = index + "-" + productIdKey;
	// build the h4 part of 'block'
	block.appendChild(createBlock("h4", product.name));
	
	// // /!\ should add the figure of the product... does not work yet... /!\ 
	block.appendChild(createFigureBlock(product));

	// // build and add the div.description part of 'block' 
	block.appendChild(createBlock("div", product.description, "description"));
	// // build and add the div.price part of 'block'
	block.appendChild(createBlock("div", product.price, "prix"));
	// build and add control div block to product element
	block.appendChild(createOrderControlBlock(index));
	return block;
}


/* return a new element of tag 'tag' with content 'content' and class 'cssClass'
 * @param tag (string) = the type of the created element (example : "p")
 * @param content (string) = the html wontent of the created element (example : "bla bla")
 * @param cssClass (string) (optional) = the value of the 'class' attribute for the created element
 */
let createBlock = function (tag, content, cssClass) {
	let element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className =  cssClass;
	}
	element.innerHTML = content;
	return element;
}

/*
* builds the control element (div.controle) for a product
* @param index = the index of the considered product
*
* TODO : add the event handling, 
*   /!\  in this version button and input do nothing  /!\  
*/
// Modify createOrderControlBlock to include event listeners for input and button LM
let createOrderControlBlock = (index)=> {
	let control = document.createElement("div");
	control.className = "controle";

	let input = document.createElement("input");
	input.id = index + '-' + inputIdKey;
	input.type = "number";
	input.value = "0";

	// Add input event listener for quantity validation
	input.addEventListener("input", function () {
			let quantity = parseInt(input.value);
			if (isNaN(quantity) || quantity < 0 || quantity > MAX_QTY) {
					input.value = "0";
			}
			updateButtonState(button, quantity);
	});

	let button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-" + orderIdKey;

	// Add button click event listener
button.addEventListener("click", function () {
	let quantity = parseInt(input.value);
	if (quantity > 0) {
			addToCart(index, quantity);
			input.value = "0";
			updateTotal();
	} else {

			console.log("Quantity must be greater than 0 to add to cart.");
	}
});

	// Append input and button to control
	control.appendChild(input);//Added
	control.appendChild(button);

	return control;
};

// Function to update button state based on quantity Check Again Tomorrow!
let updateButtonState = function (button, quantity) {
	button.disabled = quantity === 0;
	button.style.opacity = quantity === 0 ? 0.25 : 1;
				
};

// Function to add product to the cart
let addToCart = (index, quantity)=> {
	let product = catalog[index];

	// Check if the product is already in the cart
	let existingCartItem = document.getElementById("cartItem-" + index);
	if (existingCartItem) {
			// Update the quantity if the product is already in the cart
			let currentQuantity = parseInt(existingCartItem.querySelector(".quantite").textContent);
			quantity += currentQuantity;
			if (quantity > MAX_QTY) {
					quantity = MAX_QTY;
			}
			
			existingCartItem.querySelector(".quantite").textContent = quantity;
	} else {
			// Create a new cart item
			let cartItem = createBlock("div", "", "achat");
			cartItem.id = "cartItem-" + index;

			let itemName = createBlock("span", product.name, "nom");
			let itemQuantity = createBlock("span", quantity, "quantite");

			cartItem.appendChild(itemName);
			cartItem.appendChild(itemQuantity);

			// Add a delete button to remove the item from the cart
			let deleteButton = document.createElement("button");
			deleteButton.textContent = "Supprimer";
			deleteButton.addEventListener("click", ()=> {
					cartItem.remove();
					updateTotal();
			});
			cartItem.appendChild(deleteButton);

			// Append the cart item to the cart
			document.querySelector("#panier .achats").appendChild(cartItem);
	}
	updateTotal();
};

// Function to update the total in the cart LM
let updateTotal = () =>{
	let cartItems = document.querySelectorAll("#panier .achat");
	let total = 0;

	cartItems.forEach(function (cartItem) {
			let quantity = parseInt(cartItem.querySelector(".quantite").textContent);
			let index = cartItem.id.split("-")[1];
			let product = catalog[index];
			total += quantity * product.price;
	});
	total = total.toFixed(2);
	document.getElementById("montant").textContent = total;
};

// First point is to createFigureBlock (below LM) 

let createFigureBlock = function (product) {
	
	let figure = document.createElement("figure");
	
	let image = document.createElement("img");
	image.src = product.image;  
	image.alt = product.name; 

	// Append the image to the figure
	figure.appendChild(image);

	return figure;
};

// return createBlock("figure", `<img src="${product.image}">`, "lulu"); Study tonight and replicate

// let imagejavascript = document. createElement("img");
// imagejavascript.src = "images/nounours1.jpg";
// document.body.appendChild(imagejavascript)



	

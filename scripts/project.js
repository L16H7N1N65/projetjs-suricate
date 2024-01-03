// === constants ===
const MAX_QTY = 9;
const MIN_QTY = 1;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";

// Load cart items from local storage
function loadCartFromLocalStorage() {
const cartItems = localStorage.getItem("cartItems");
if (cartItems) {
const parsedCartItems = JSON.parse(cartItems);

// Iterate through the items and add them to the cart
parsedCartItems.forEach((item) => {
addToCart(item.index, item.quantity);
});

// Update the total after loading the items
updateTotal();
}
}

// === global variables  ===
// the total cost of selected products
let total = 0;
let productElements = [];
let cartTotal = 0;
const searchInput = document.getElementById("filter");


// fonction pour ajouter un nouveau nom & un favicon pour le site © Christopher
let init = function () {
document.title = "Sneakers Store";
// Ajouter un nouveau nom pour le site
createShop();
loadCartFromLocalStorage();

addFavicon(
"style/images/802aeb91-6118-44d5-a61e-8b6019f43f9a-removebg-preview.ico"
);
// Ajouter un favicon pour le site
};
window.addEventListener("load", init);

// usefull functions
/*
* create and add all the div.produit elements to the div#boutique element
* according to the product objects that exist in 'catalog' variable
*/
function addFavicon(faviconPath) {
let favicon = document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/x-icon";
favicon.href = faviconPath;
// Fonction pour ajouter le favicon suricate 

document.head.appendChild(favicon);
// Ajouter le favicon au <head>
}

// Réparer la fonction createShop © Christopher
let createShop = function () {
let searchInput = document.getElementById("filter");

if (!searchInput) {
console.error("Error: Element with id 'filter' not found.");
return;
}
let shop = document.getElementById("boutique");
// Récupérer l'élément avec l'ID boutique depuis le DOM pour le mettre dans la boutique

for (let i = 0; i < catalog.length; i++) {
let productElement = createProduct(catalog[i], i);
productElements.push(productElement);
shop.appendChild(productElement);
}
// Lier chaque produit avec chaque élément en utilisant la fonction createProduct avec la data puis les lié a la boutique

searchInput.addEventListener("input", (e) => {
let searchTerm = searchInput.value.toLowerCase();
// Obtenir le terme de recherche depuis l'imput et le convertir en minuscules pour être sur de la casse (merci google)

productElements.forEach((productElement) => {
let searchAttribute = productElement.getAttribute("data-search");
productElement.style.display = searchAttribute.includes(searchTerm)
? ""
: "none";
// Obtenir l'attribut de recherche spécifique pour chaque produit
});
});
};




/*
* create the div.produit elment corresponding to the given product
* The created element receives the id "index-product" where index is replaced by param's value
* @param product (product object) = the product for which the element is created
* @param index (int) = the index of the product in catalog, used to set the id of the created element
*/
// Réparer la fonction createProduct © Christopher
let createProduct = function (product, index) {
// build the div element for product
let block = document.createElement("div");
block.className = "produit";
// set the id for this product
block.id = index + "-" + productIdKey;
// build the h4 part of 'block'
block.appendChild(createBlock("h4", product.name));

// build and add the figure of the product
let figureBlock = createFigureBlock(product);
block.appendChild(figureBlock);

// build and add the div.description part of 'block'
block.appendChild(createBlock("div", product.description, "description"));
// build and add the div.price part of 'block'
block.appendChild(createBlock("div", product.price, "prix"));
block.appendChild(createBlock("div", "Color: " + product.color, "color"));
block.appendChild(createBlock("div", "Brand: " + product.brand, "brand"));
block.appendChild(createBlock("div", "Size: " + product.size, "size"));
// prod.appendChild(glob);
// Ajouter la Couleur, la Marque & la Taille a la description du produit

let searchAttributes = product.name.toLowerCase();

if (typeof product.color === "string") {
searchAttributes += " " + product.color.toLowerCase();
// Vérifier si la couleur est une chaîne de caractère avant de l'ajouter à la recherche
}

if (typeof product.size === "string") {
searchAttributes += " " + product.size.toLowerCase();
// Vérifier si la pointure est une chaîne de caractère ou un tableau avant de l'ajouter
} else if (Array.isArray(product.size)) {
// Si la taille est un tableau, ajouter chaque taille manuellement à la recherche
searchAttributes +=
" " + product.size.map((size) => size.toString().toLowerCase()).join(" ");
}

block.setAttribute("data-search", searchAttributes);

let formattedPrice = parseFloat(product.price).toLocaleString("fr-FR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2,
// MAJ pour afficher le prix de manière lisible car sinon c'est moche (merci google pour le fraction 2)
});

block.appendChild(createBlock("div", formattedPrice + " €", "prix"));
// === build and add control div block to product element ===

// build and add control div block to product element
block.appendChild(createOrderControlBlock(index));

// Add hover effect and eye icon only to product-0
if (index === 0) {
figureBlock.classList.add("hover-effect");

// Build the hover for our special project
let eyeIcon = document.createElement("img");
eyeIcon.src = "./eye.png";
eyeIcon.alt = "3D Project";
eyeIcon.className = "eye-icon";
eyeIcon.style.opacity = "0"; // Initially transparent
eyeIcon.style.width = "40%"; // Set the width as needed
eyeIcon.style.height = "40%"; // Set the height as needed
figureBlock.appendChild(eyeIcon);

// Toggle eye icon visibility and opacity on mouseover the image
figureBlock.addEventListener("mouseover", () => {
figureBlock.classList.add("hovered");
eyeIcon.style.opacity = "0.5"; // Fully visible
});

figureBlock.addEventListener("mouseout", () => {
figureBlock.classList.remove("hovered");
eyeIcon.style.opacity = "0"; // Transparent
});

// Add click event listener for launching the 3D project
eyeIcon.addEventListener("click", () => {
// Open a new window and navigate to three-index.html
const newWindow = window.open(
"./three-index.html",
"_blank",
"width=" + window.innerWidth / 2 + ",height=" + window.innerHeight
);

// Check if the new window was successfully opened
if (newWindow) {
// Optionally, you can focus on the new window
newWindow.focus();

// Add a close button to the new window
const closeButton = newWindow.document.createElement("button");
closeButton.textContent = "Close";
closeButton.style.position = "absolute";
closeButton.style.top = "10px";
closeButton.style.right = "10px";
closeButton.addEventListener("click", () => newWindow.close());
newWindow.document.body.appendChild(closeButton);
} else {
console.error("Failed to open the new window.");
}
});
}

return block;
};

/* return a new element of tag 'tag' with content 'content' and class 'cssClass'
* @param tag (string) = the type of the created element (example : "p")
* @param content (string) = the html wontent of the created element (example : "bla bla")
* @param cssClass (string) (optional) = the value of the 'class' attribute for the created element
*/
let createBlock = function (tag, content, cssClass) {
let element = document.createElement(tag);
if (cssClass != undefined) {
element.className = cssClass;
}
element.innerHTML = content;
return element;
};

/*
* builds the control element (div.controle) for a product
* @param index = the index of the considered product
*
* TODO : add the event handling,
*   /!\  in this version button and input do nothing  /!\
*/
// Modify createOrderControlBlock to include event listeners for input and button LM
let createOrderControlBlock = (index) => {
let controlParent = document.createElement("div");
controlParent.className = "controle-parent";

let control = document.createElement("div");
control.className = "controle";

let input = document.createElement("input");
input.id = index + "-" + inputIdKey;
input.type = "number";
input.value = "0";


// Ajout d'un évément pour la quanité et géré l'opacité
input.addEventListener("input", function () {
  let quantity = parseInt(input.value);

  if (isNaN(quantity) || quantity < 0) {
    input.value = "0";
    button.style.opacity = 0.25;
  } else if (quantity > 9) {
    input.value = "9";
    button.style.opacity = 1;
  } else {
    // Restaure l'opacité à 1 lorsque quantity est égal à zéro
    button.style.opacity = quantity === 0 ? 0 : 0.25;
  }

  updateButtonState(button, quantity);
});


let button = document.createElement("button");
button.className = "commander";
button.id = index + "-" + orderIdKey;

// Add button click event listener
button.addEventListener("click", function () {
let quantity = parseInt(input.value);
if (quantity > 0) {
addToCart(index, quantity);
updateTotal();
} else {
console.log("Quantity must be greater than 0 to add to cart.");
}
input.value = "0"
});

// Append input and button to control
control.appendChild(input);
control.appendChild(button);



let saveButton = document.createElement("button");
saveButton.className = "sauvegarder";
saveButton.textContent = "Sauvegarder";
saveButton.addEventListener("click", function () {
saveCartToLocalStorage();
// Création boutton Sauvegarder © Christopher

});
control.appendChild(saveButton);
controlParent.appendChild(control);


return controlParent;
};

function saveCartToLocalStorage() {
let cartItems = [];

let cartItemsElements = document.querySelectorAll("#panier .achat");
cartItemsElements.forEach(function (cartItemElement) {
let index = cartItemElement.id.split("-")[1];
let quantity = parseInt(cartItemElement.querySelector(".quantite").textContent);
cartItems.push({ index, quantity });
});

// Sauvegarde dans le local Storage
localStorage.setItem("cartItems", JSON.stringify(cartItems));

console.log("Panier sauvegardé avec succès !");
}



// Function to update button state based on quantity Check Again Tomorrow!
let updateButtonState = function (button, quantity) {
  button.disabled = quantity === 0;

  // Use offsetHeight to trigger a reflow and ensure immediate update
  button.offsetHeight;

  button.style.opacity = quantity === 0 ? 0.25 : 1;
};



// Function to add product to the cart
let addToCart = (index, quantity) => {
  let product = catalog[index];

  // Check if the product is already in the cart
  let existingCartItem = document.getElementById("cartItem-" + index);
  if (existingCartItem) {
    // Update the quantity if the product is already in the cart
    let currentQuantity = parseInt(
      existingCartItem.querySelector(".quantite").textContent
    );
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

    // Création d'un bouton de suppression © Linda
    // Add a delete button to remove the item from the cart
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.addEventListener("click", () => {
      cartItem.remove();
      updateTotal();
    });
    cartItem.appendChild(deleteButton);

    // Append the cart item to the cart
    document.querySelector("#panier .achats").appendChild(cartItem);
  }

  // Mise à jour de l'opacité du bouton après l'ajout au panier © Christopher
  let button = document.getElementById(index + "-" + orderIdKey);
  button.style.opacity = quantity === 0 ? 0 : 0.25;

  updateTotal();
};


// Function to update the total in the cart © Linda
let updateTotal = () => {
  let cartItems = document.querySelectorAll("#panier .achat");
  let total = 0;

  cartItems.forEach(function (cartItem) {
    let quantity = parseInt(cartItem.querySelector(".quantite").textContent);
    let index = cartItem.id.split("-")[1];
    let product = catalog[index];
    total += quantity * product.price;
  });

  // Format the total with spaces for thousands and cents, and add the euro symbol
  let formattedTotal = total.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " €";

  document.getElementById("montant").textContent = formattedTotal;
};


// First point is to createFigureBlock © Linda

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

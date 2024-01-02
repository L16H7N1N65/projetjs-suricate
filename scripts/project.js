// === constants ===
const MAX_QTY = 9;
const MIN_QTY = 1;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";

// === global variables  ===
// the total cost of selected products
let total = 0;
let productElements = [];
let cartTotal = 0;
const searchInput = document.getElementById("filter");

// function called when page is loaded, it performs initializations
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

// ETAPE 7. Réparer la fonction createShop CP
let createShop = function () {
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
// ETAPE 8. Réparer la fonction createProduct
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
  let control = document.createElement("div");
  control.className = "controle";

  let input = document.createElement("input");
  input.id = index + "-" + inputIdKey;
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
  button.className = "commander";
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
  control.appendChild(input); //Added
  control.appendChild(button);

  return control;
};

// Function to update button state based on quantity Check Again Tomorrow!
let updateButtonState = function (button, quantity) {
  button.disabled = quantity === 0;
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
		
// ETAPE 5. Création d'un bouton de suppression
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
  updateTotal();
};

// Function to update the total in the cart LM
let updateTotal = () => {
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

// return createBlock("figure", `<img src="${product.image}">`, "lulu"); Study tonight and replicate

// let imagejavascript = document. createElement("img");
// imagejavascript.src = "images/nounours1.jpg";
// document.body.appendChild(imagejavascript)





	

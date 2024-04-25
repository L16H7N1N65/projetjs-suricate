// === constants ===
const MAX_QTY = 9;
const MIN_QTY = 1;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";

// Catalog4.js is in the "data" folder
const catalog4Path = "./data/catalog4.js";

// Loading catalog4.js using a script tag
const script = document.createElement("script");
script.src = catalog4Path;
document.head.appendChild(script);

// // Wait for the script to load before using its contents remember past issues !
// script.onload = function () {

//   // Launch the eye project
//   launchEyeProject();
// };

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

// Global variables
let total = 0;
let productElements = [];
let cartTotal = 0;
const searchInput = document.getElementById("filter");

// Function called when the page is loaded, it performs initializations
let init = function () {
  document.title = "Sneakers Store";
  createShop();
  loadCartFromLocalStorage();
  addFavicon(
    "style/images/802aeb91-6118-44d5-a61e-8b6019f43f9a-removebg-preview.ico"
  );
  cartTotal = 0;
};
window.addEventListener("load", init);

// Create and add all the div.produit elements to the div#boutique element
let createShop = function () {
  let searchInput = document.getElementById("filter");

  if (!searchInput) {
    console.error("Error: Element with id 'filter' not found.");
    return;
  }
  let shop = document.getElementById("boutique");

  for (let i = 0; i < catalog.length; i++) {
    let productElement = createProduct(catalog[i], i);
    productElements.push(productElement);
    shop.appendChild(productElement);
  }

  searchInput.addEventListener("input", (e) => {
    let searchTerm = searchInput.value.toLowerCase();

    productElements.forEach((productElement) => {
      let searchAttribute = productElement.getAttribute("data-search");
      productElement.style.display = searchAttribute.includes(searchTerm)
        ? ""
        : "none";
    });
  });
};

// Create the div.produit element corresponding to the given product
let createProduct = function (product, index) {
  // Build the div element for product
  let block = document.createElement("div");
  block.className = "produit";
  block.id = index + "-" + productIdKey;
  block.appendChild(createBlock("h4", product.name));

  // Build and add the figure of the product
  let figureBlock = createFigureBlock(product);
  block.appendChild(figureBlock);
  // // Add the eye icon only to products with index greater than 0
  //   if (index !== 0) {
  //     figureBlock.classList.add("hover-effect");

  //     let eyeIcon = document.createElement("img");
  //     eyeIcon.src = "./eye.png";
  //     eyeIcon.alt = "View Project";
  //     eyeIcon.className = "eye-icon";
  //     eyeIcon.style.opacity = "0";
  //     eyeIcon.style.width = "15%";
  //     eyeIcon.style.height = "15%";
  //     figureBlock.appendChild(eyeIcon);

  //     figureBlock.addEventListener("mouseover", () => {
  //       figureBlock.classList.add("hovered");
  //       eyeIcon.style.opacity = "0.5";
  //     });

  //     figureBlock.addEventListener("mouseout", () => {
  //       figureBlock.classList.remove("hovered");
  //       eyeIcon.style.opacity = "0";
  //     });

  //     eyeIcon.addEventListener("click", () => {
  //       openEyeModal(index);
  //     });
  //   }
  block.appendChild(createBlock("div", product.description, "description"));
  block.appendChild(createBlock("div", product.price, "prix"));
  block.appendChild(createBlock("div", "Color: " + product.color, "color"));
  block.appendChild(createBlock("div", "Brand: " + product.brand, "brand"));
  block.appendChild(createBlock("div", "Size: " + product.size, "size"));

  let searchAttributes = product.name.toLowerCase();

  if (typeof product.color === "string") {
    searchAttributes += " " + product.color.toLowerCase();
  }

  if (typeof product.size === "string") {
    searchAttributes += " " + product.size.toLowerCase();
  } else if (Array.isArray(product.size)) {
    searchAttributes +=
      " " + product.size.map((size) => size.toString().toLowerCase()).join(" ");
  }

  block.setAttribute("data-search", searchAttributes);

  let formattedPrice = parseFloat(product.price).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  block.appendChild(createBlock("div", formattedPrice + " €", "prix"));

  block.appendChild(createOrderControlBlock(index));

  if (index !== 0) {
    figureBlock.classList.add("hover-effect");

    let eyeIcon = document.createElement("img");
    eyeIcon.src = "./eye.png";
    eyeIcon.alt = "View Project";
    eyeIcon.className = "eye-icon";
    eyeIcon.style.opacity = "0";
    eyeIcon.style.width = "15%";
    eyeIcon.style.height = "15%";
    figureBlock.appendChild(eyeIcon);

    figureBlock.addEventListener("mouseover", () => {
      figureBlock.classList.add("hovered");
      eyeIcon.style.opacity = "0.5";
    });

    figureBlock.addEventListener("mouseout", () => {
      figureBlock.classList.remove("hovered");
      eyeIcon.style.opacity = "0";
    });

    eyeIcon.addEventListener("click", () => {
      const index = parseInt(figureBlock.id.split("-")[0]); // Extracting the index from the element ID
      const startIndex = 1; // Check again tomorrow as it is starting

      if (index >= startIndex) {
        const galleryModal = document.createElement("div");
        galleryModal.className = "gallery-modal";
        document.body.appendChild(galleryModal);

        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.className = "close-button";
        closeButton.addEventListener("click", () => {
          galleryModal.remove();
        });
        galleryModal.appendChild(closeButton);

        const galleryContainer = document.createElement("div");
        galleryContainer.className = "gallery-container";
        galleryModal.appendChild(galleryContainer);

        const galleryImage = document.createElement("img");
        galleryImage.src = catalog4[index - startIndex].image;
        galleryImage.alt = catalog4[index - startIndex].name;
        galleryContainer.appendChild(galleryImage);
      }
    });
  } else {
    figureBlock.classList.add("hover-effect");

    let threeDIcon = document.createElement("img");
    threeDIcon.src = "./3d-icon.png";
    threeDIcon.alt = "3D Project";
    threeDIcon.className = "three-d-icon";
    threeDIcon.style.opacity = "0";
    threeDIcon.style.width = "15%";
    threeDIcon.style.height = "15%";
    threeDIcon.style.position = "absolute";
    threeDIcon.style.top = "10%";
    threeDIcon.style.left = "10%";
    figureBlock.appendChild(threeDIcon);

    figureBlock.addEventListener("mouseover", () => {
      figureBlock.classList.add("hovered");
      threeDIcon.style.opacity = "0.5";
    });

    figureBlock.addEventListener("mouseout", () => {
      figureBlock.classList.remove("hovered");
      threeDIcon.style.opacity = "0";
    });

    threeDIcon.addEventListener("click", () => {
      const newWindow = window.open(
        "./three-index.html",
        "_blank",
        "width=" + window.innerWidth / 2 + ",height=" + window.innerHeight
      );

      if (newWindow) {
        newWindow.focus();
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

let createBlock = function (tag, content, cssClass) {
  let element = document.createElement(tag);
  if (cssClass != undefined) {
    element.className = cssClass;
  }
  element.innerHTML = content;
  return element;
};

let createOrderControlBlock = (index) => {
  let controlParent = document.createElement("div");
  controlParent.className = "controle-parent";

  let control = document.createElement("div");
  control.className = "controle";

  let input = document.createElement("input");
  input.id = index + "-" + inputIdKey;
  input.type = "number";
  input.value = "0";

  input.addEventListener("input", function () {
    let quantity = parseInt(input.value);

    if (isNaN(quantity) || quantity < 0) {
      input.value = "0";
      button.style.opacity = 0.25;
    } else if (quantity > 9) {
      input.value = "9";
      button.style.opacity = 1;
    } else {
      button.style.opacity = quantity === 0 ? 0 : 0.25;
    }

    updateButtonState(button, quantity);
  });

  let button = document.createElement("button");
  button.className = "commander";
  button.id = index + "-" + orderIdKey;

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

  control.appendChild(input);
  control.appendChild(button);

  let saveButton = document.createElement("button");
  saveButton.className = "sauvegarder";
  saveButton.textContent = "Sauvegarder";
  saveButton.addEventListener("click", function () {
    saveCartToLocalStorage();
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
    let quantity = parseInt(
      cartItemElement.querySelector(".quantite").textContent
    );
    cartItems.push({ index, quantity });
  });

  // Sauvegarde dans le local Storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  console.log("Panier sauvegardé avec succès !");
}

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

  // Mise à jour de l'opacité du bouton après l'ajout au panier © Christopher
  let button = document.getElementById(index + "-" + orderIdKey);
  console.log(button); // Check the selected button in the console
  button.style.opacity = quantity === 0 ? 0 : 0.25;

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

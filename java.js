let products = [];
let price=[];
let cart = [];

//Admin Section
function addProduct() {
  const productName = document.getElementById("productName").value;
  if (productName.trim() !== "") {
    products.push({ name: productName, price: null });
    updateProductSelect();
    updateProductToCart();
    document.getElementById("productName").value = "";
  }
}
function updateProductSelect() {
  const productSelect = document.getElementById("productSelect");
  productSelect.innerHTML = '<option value="">Select Product</option>';
  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
}
function updateProductToCart() {
  const productToCart = document.getElementById("productToCart");
  productToCart.innerHTML = '<option value="">Select Product</option>';
  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name;
    productToCart.appendChild(option);
  });
}
function setPrice() {
  const selectedProduct = document.getElementById("productSelect").value;
  const price = parseFloat(document.getElementById("price").value);
  if (selectedProduct && !isNaN(price) && price >= 0) {
    const index = products.findIndex(product => product.name === selectedProduct);
    if (index !== -1) {
      products[index].price = price;
      alert(`Price for ${selectedProduct} set to $${price.toFixed(2)}`);
    }
  } else {
    alert("Please select a product and enter a valid price.");
  }
}

//Checkout Section
function startNewTransaction() {
  cart = [];
  document.getElementById("productToCart").value = "";
  document.getElementById("units").value = "";

  document.getElementById("cartDetails").innerHTML = "";
  document.getElementById("totalAmount").textContent = "";
}
function addToCart() {
  const selectedProduct = document.getElementById("productToCart").value;
  const units = parseInt(document.getElementById("units").value);
  if (selectedProduct && !isNaN(units) && units > 0) {
    const product = products.find(product => product.name === selectedProduct);
    if (product) {
      cart.push({ name: selectedProduct, price: product.price, units: units });
      updateCartDetails();
      alert(`Added ${units} units of ${selectedProduct} to cart.`);
    }
  } else {
    alert("Please select a product and enter a valid number of units.");
  }
}
function updateCartDetails() {
  const cartDetails = document.getElementById("cartDetails");
  cartDetails.innerHTML = "";
  cart.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - Price per Unit: $${item.price.toFixed(2)} - Units: ${item.units} - Total Price: $${(item.price * item.units).toFixed(2)}`;
    cartDetails.appendChild(listItem);
  });
  updateTotalAmount();
}
function updateTotalAmount() {
  const totalAmount = cart.reduce((total, item) => total + (item.price * item.units), 0);
  const tax = totalAmount * 0.05;
  const totalAmountWithTax = totalAmount + tax;
  document.getElementById("totalAmount").textContent = `Total Amount (including 5% tax): $${totalAmountWithTax.toFixed(2)}`;
}
function receivePayment() {
  const totalAmount = cart.reduce((total, item) => total + (item.price * item.units), 0);
  const tax = totalAmount * 0.05; 
  const totalAmountWithTax = totalAmount + tax;
  if (totalAmountWithTax > 0) {
    alert(`Thank you for your purchase! Total amount (including 5% tax): $${totalAmountWithTax.toFixed(2)}`);
    startNewTransaction();
  } else {
    alert("Your cart is empty. Please add products to proceed.");
  }
}
// Receipt section

let receipt = [
    { name: "Product 1: ", price: "$ ", units: " " },
    { name: "Product 2: ", price: "$ ", units: " " },
    { name: "Product 3: ", price: "$ ", units: " " }
  ];
  function displayDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    document.getElementById("dateTime").textContent = "Date and Time: " + dateTimeString;
  }
  function displayReceipt() {
    const receiptItems = document.getElementById("receiptItems");
    const totalAmountElement = document.getElementById("totalAmount");

    receiptItems.innerHTML = ""; 
    let totalAmount = 0;
    receipt.forEach(item => {
      const listItem = document.createElement("li");
      const totalPrice = item.price * item.units;
      totalAmount += totalPrice;
      listItem.textContent = `${item.name} - Price per Unit: $${item.price.toFixed(2)} - Units: ${item.units} - Total Price: $${totalPrice.toFixed(2)}`;
      receiptItems.appendChild(listItem);
    });
    const tax = totalAmount * 0.05;
    const totalAmountWithTax = totalAmount + tax;
    totalAmountElement.textContent = `Total Amount (including 5% tax): $${totalAmountWithTax.toFixed(2)}`;
  }
  displayDateTime();
  displayReceipt();